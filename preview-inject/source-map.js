import { SourceMapConsumer } from "source-map";
import {
  OpenTagInfo,
  correctSourceMapPosition,
  findOpeningTag,
  findNextMatchingTag,
  extractRange,
  extractSourceContext,
  loadSourceMap,
} from "./helper/source-map-helper";let isInitialized = false;const errorCache = new Map();
const ERROR_CACHE_TTL = 5 * 60 * 1000; // 5 minutes expiration time
const ERROR_CACHE_MAX_SIZE = 1000; // Maximum cache sizesetInterval(() => {
  const now = Date.now();
  for (const [key, result] of errorCache.entries()) {
    if (now - (result).timestamp > ERROR_CACHE_TTL) {
      errorCache.delete(key);
    }
  }
}, 60000); // Clean every minute
async function initializeSourceMapConsumer() {
  if (isInitialized) return;
  try {    await (SourceMapConsumer).initialize({
      "lib/mappings.wasm":
        "https://unpkg.com/source-map@0.7.6/lib/mappings.wasm",
    });
    isInitialized = true;
  } catch (error) {
    console.warn("Failed to initialize SourceMapConsumer:", error);    try {      await (SourceMapConsumer).initialize({});
      isInitialized = true;
    } catch (fallbackError) {
      console.error(
        "SourceMapConsumer initialization failed completely:",
        fallbackError
      );
      throw fallbackError;
    }
  }
}
  mappedStack;
  sourceContext: Array<{
    file;
    line;
    column;
    context;
    closedBlock?: {
      tagName;
      code;
      context;
      startLine;
      endLine;
    };
  }>;
};
function generateErrorSignature(error) {
  if (!error || !error.stack) {
    return `no-stack-${error?.message || "unknown"}`;
  }  const stack = error.stack;  const lines = stack.split("\n").slice(0, 6);  const normalizedLines = lines.map(
    (line) =>
      line
        .replace(/\?t=\d+/g, "") // Remove timestamp parameters
        .replace(/\?v=[\w\d]+/g, "") // Remove version parameters
        .replace(/\d{13,}/g, "TIMESTAMP") // Replace timestamps
  );
  return `${error.name || "Error"}-${error.message}-${normalizedLines.join(
    "|"
  )}`;
}
const FILTER_STACK_PATH = "preview-inject/";
export async function mapErrorStack(
  error,
  maxContexLimit = 10,
  expectedTagName
) {
  if (!error || !error.stack) {
    return {
      errorMessage: error?.message || "",
      mappedStack: error?.stack || "",
      sourceContext: [],
    };
  }  const errorSignature = generateErrorSignature(error);  if (errorCache.has(errorSignature)) {
    const cachedResult = errorCache.get(errorSignature)!;
    console.log("Using cached error mapping for:", errorSignature);
    return cachedResult;
  }  if (errorCache.size >= ERROR_CACHE_MAX_SIZE) {
    return null;
  }  await initializeSourceMapConsumer();
  const stackLines = error.stack.split("\n");
  const mappedLines[] = [];
  const sourceContext: Array<{
    file;
    line;
    column;
    context;
    closedBlock?: {
      tagName;
      code;
      context;
      startLine;
      endLine;
    };
  }> = [];
  const sourceMapCache = new Map();
  const sourceContentCache = new Map();
  let contextLimit = 0;
  for (const line of stackLines) {    const match = line.match(
      /at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)|at\s+(.+?):(\d+):(\d+)|([^@]*)@(.+?):(\d+):(\d+)/
    );
    if (!match) {
      mappedLines.push(line);
      continue;
    }
    let functionName,
      fileName,
      lineNumber,
      columnNumber;
    if (match[1]) {
      functionName = match[1];
      fileName = match[2];
      lineNumber = parseInt(match[3]);
      columnNumber = parseInt(match[4]);
    } else if (match[5]) {      functionName = "<anonymous>";
      fileName = match[5];
      lineNumber = parseInt(match[6]);
      columnNumber = parseInt(match[7]);
    } else {      functionName = match[8];
      fileName = match[9];
      lineNumber = parseInt(match[10]);
      columnNumber = parseInt(match[11]);
    }
    try {
      const sourceMapUrl = `${fileName}.map`;
      let consumer = sourceMapCache.get(sourceMapUrl);
      if (!consumer) {
        const sourceMapContent = await loadSourceMap(sourceMapUrl);
        consumer = await new SourceMapConsumer(sourceMapContent);
        sourceMapCache.set(sourceMapUrl, consumer);
      }
      const originalPosition = consumer.originalPositionFor({
        line: lineNumber,
        column: columnNumber,
      });
      if (originalPosition.source) {
        if (originalPosition.source.includes(FILTER_STACK_PATH)) {
          continue;
        }
        const source = originalPosition.source
          .split("/")
          .filter((s) => s !== "..")
          .join("/");
        const originalFunctionName = originalPosition.name || functionName;
        const mappedLine = `    at ${originalFunctionName} (${source}:${originalPosition.line}:${originalPosition.column})`;
        mappedLines.push(mappedLine);        if (
          originalPosition.line &&
          originalPosition.column &&
          contextLimit < maxContexLimit
        ) {
          contextLimit++;
          try {
            const sourceContent = await getSourceContent(
              consumer,
              originalPosition.source,
              sourceContentCache
            );
            if (sourceContent) {
              const isNodeModules = source.includes("node_modules");
              const isJSXFile = /\.(tsx|jsx)$/.test(source);              let closedBlock:
                | {
                    tagName;
                    code;
                    context;
                    startLine;
                    endLine;
                  }
                | undefined;
              if (!isNodeModules && isJSXFile) {
                const jsxElement = extractJSXElement(
                  sourceContent,
                  originalPosition.line,
                  originalPosition.column,
                  expectedTagName
                );
                if (jsxElement) {
                  closedBlock = {
                    tagName: jsxElement.tagName,
                    code: jsxElement.code,
                    context: jsxElement.context,
                    startLine: jsxElement.startLine,
                    endLine: jsxElement.endLine,
                  };
                }
              }
              const context = extractSourceContext(
                sourceContent,
                originalPosition.line,
                isNodeModules ? 1 : 10
              );
              sourceContext.push({
                file: source,
                line: originalPosition.line,
                column: originalPosition.column,
                context: context,
                closedBlock,
              });
            }
          } catch (contextError) {
            console.warn("Failed to extract source context:", contextError);
          }
        }
      } else {
        mappedLines.push(line);
      }
    } catch (err) {
      console.warn("Failed to map stack line:", line, err);
      mappedLines.push(line);
    }
  }  for (const consumer of sourceMapCache.values()) {
    consumer.destroy();
  }
  const result: ErrorMappingResult = {
    errorMessage: error?.message || "",
    mappedStack: mappedLines.join("\n"),
    sourceContext: sourceContext,
  };  (result).timestamp = Date.now();
  errorCache.set(errorSignature, result);
  return result;
}
export function clearErrorCache() {
  errorCache.clear();
}
export function getErrorCacheStats() {
  return {
    size: errorCache.size,
    keys: Array.from(errorCache.keys()),
  };
}
async function getSourceContent(
  consumer: SourceMapConsumer,
  sourcePath,
  cache
) {  if (cache.has(sourcePath)) {
    return cache.get(sourcePath) || null;
  }  const sourceContent = consumer.sourceContentFor(sourcePath);
  if (sourceContent) {
    cache.set(sourcePath, sourceContent);
    return sourceContent;
  }
  return null;
}
  code; // Element code (from tag start column)
  context; // Full lines containing the element (preserves indentation)
  startLine;
  endLine;
  isSelfClosing;
};
export function extractJSXElement(
  sourceContent,
  targetLine,
  targetColumn,
  expectedTagName
) {
  const lines = sourceContent.split("\n");
  let targetIndex = targetLine - 1;
  if (targetIndex < 0 || targetIndex >= lines.length) {
    return undefined;
  }  let openTagInfo = findOpeningTag(lines, targetIndex, targetColumn);  if (expectedTagName && openTagInfo) {
    const normalizedExpected = expectedTagName.toLowerCase();
    const normalizedFound = openTagInfo.tagName.toLowerCase();
    if (normalizedExpected !== normalizedFound) {      const correctedInfo = findNextMatchingTag(
        lines,
        targetIndex,
        normalizedExpected
      );
      if (correctedInfo) {
        openTagInfo = correctedInfo;
      }
    }
  } else if (!openTagInfo) {    const corrected = correctSourceMapPosition(
      lines,
      targetIndex,
      targetColumn
    );
    openTagInfo = findOpeningTag(lines, corrected.lineIndex, corrected.column);
  }
  if (!openTagInfo) {
    return undefined;
  }
  const {
    tagName,
    lineIndex: openLineIndex,
    columnStart,
    closeLineIndex,
    closeColumnEnd,
    isSelfClosing,
  } = openTagInfo;
  return {
    tagName,
    code: extractRange(
      lines,
      openLineIndex,
      columnStart,
      closeLineIndex,
      closeColumnEnd
    ),
    context: lines.slice(openLineIndex, closeLineIndex + 1).join("\n"),
    startLine: openLineIndex + 1,
    endLine: closeLineIndex + 1,
    isSelfClosing,
  };
}
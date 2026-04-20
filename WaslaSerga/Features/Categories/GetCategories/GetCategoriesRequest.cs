using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Categories.GetCategories;

public record GetCategoriesRequest() : IRequest<Result<object>>;

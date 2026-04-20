using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperSkills.AddSkillToHelper;

public record AddSkillToHelperRequest() : IRequest<Result<object>>;

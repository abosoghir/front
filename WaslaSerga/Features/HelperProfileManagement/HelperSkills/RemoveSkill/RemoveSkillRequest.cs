using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperSkills.RemoveSkill;

public record RemoveSkillRequest() : IRequest<Result<object>>;

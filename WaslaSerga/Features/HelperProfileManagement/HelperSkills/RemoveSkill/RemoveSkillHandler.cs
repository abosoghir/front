using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperSkills.RemoveSkill;

public class RemoveSkillHandler : IRequestHandler<RemoveSkillRequest, Result<object>>
{
    public async Task<Result<object>> Handle(RemoveSkillRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}

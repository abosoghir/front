using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.HelperProfileManagement.HelperSkills.AddSkillToHelper;

public class AddSkillToHelperHandler : IRequestHandler<AddSkillToHelperRequest, Result<object>>
{
    public async Task<Result<object>> Handle(AddSkillToHelperRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}

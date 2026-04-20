using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Categories.GetCategories;

public class GetCategoriesHandler : IRequestHandler<GetCategoriesRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetCategoriesRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}

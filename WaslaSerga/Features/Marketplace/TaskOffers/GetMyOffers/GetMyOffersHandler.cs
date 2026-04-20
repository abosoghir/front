using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.TaskOffers.GetMyOffers;

public class GetMyOffersHandler : IRequestHandler<GetMyOffersRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetMyOffersRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}

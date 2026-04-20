using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.TaskOffers.RejectOffer;

public class RejectOfferHandler : IRequestHandler<RejectOfferRequest, Result<object>>
{
    public async Task<Result<object>> Handle(RejectOfferRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}

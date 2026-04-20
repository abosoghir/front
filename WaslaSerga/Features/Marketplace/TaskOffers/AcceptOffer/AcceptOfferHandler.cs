using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.TaskOffers.AcceptOffer;

public class AcceptOfferHandler : IRequestHandler<AcceptOfferRequest, Result<object>>
{
    public async Task<Result<object>> Handle(AcceptOfferRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}

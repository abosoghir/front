using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.TaskOffers.CreateOffer;

public class CreateOfferHandler : IRequestHandler<CreateOfferRequest, Result<object>>
{
    public async Task<Result<object>> Handle(CreateOfferRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}

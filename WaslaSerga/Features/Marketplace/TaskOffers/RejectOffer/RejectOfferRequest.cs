using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.TaskOffers.RejectOffer;

public record RejectOfferRequest() : IRequest<Result<object>>;

using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.TaskOffers.AcceptOffer;

public record AcceptOfferRequest() : IRequest<Result<object>>;

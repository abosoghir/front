using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.TaskOffers.CreateOffer;

public record CreateOfferRequest() : IRequest<Result<object>>;

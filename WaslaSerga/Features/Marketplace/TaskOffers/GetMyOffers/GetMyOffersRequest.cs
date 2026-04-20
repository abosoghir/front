using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Marketplace.TaskOffers.GetMyOffers;

public record GetMyOffersRequest() : IRequest<Result<object>>;

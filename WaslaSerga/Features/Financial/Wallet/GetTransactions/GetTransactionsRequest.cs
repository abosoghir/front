using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Financial.Wallet.GetTransactions;

public record GetTransactionsRequest() : IRequest<Result<object>>;

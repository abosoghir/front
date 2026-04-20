using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Financial.Wallet.GetWallet;

public record GetWalletRequest() : IRequest<Result<object>>;

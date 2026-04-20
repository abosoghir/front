using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Financial.Wallet.GetWallet;

public class GetWalletHandler : IRequestHandler<GetWalletRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetWalletRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}

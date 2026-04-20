using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace WaslaSerga.Features.Financial.Wallet.GetTransactions;

public class GetTransactionsHandler : IRequestHandler<GetTransactionsRequest, Result<object>>
{
    public async Task<Result<object>> Handle(GetTransactionsRequest request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}

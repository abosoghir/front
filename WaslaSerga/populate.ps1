$features = @(
    "AuthenticationManagement/Login",
    "AuthenticationManagement/Register",
    "AuthenticationManagement/RefreshToken",
    "AuthenticationManagement/ChangePassword",
    "AuthenticationManagement/RevokeRefreshToken",
    
    "ProfileManagement/GetMyProfile",
    "ProfileManagement/UpdateMyProfile",
    "ProfileManagement/GetUserProfile",
    
    "HelperBrowse/GetHelpers",
    "HelperBrowse/GetAllHelpersDetailed",
    "HelperBrowse/GetHelperById",
    "HelperBrowse/RecommendHelpers",
    
    "Categories/GetCategories",
    
    "Marketplace/Tasks/GetTasks",
    "Marketplace/Tasks/GetMyTasks",
    "Marketplace/Tasks/GetTaskById",
    "Marketplace/Tasks/CreateTask",
    "Marketplace/Tasks/UpdateTask",
    "Marketplace/Tasks/DeleteTask",
    "Marketplace/Tasks/CompleteTask",
    
    "Marketplace/TaskOffers/CreateOffer",
    "Marketplace/TaskOffers/AcceptOffer",
    "Marketplace/TaskOffers/RejectOffer",
    "Marketplace/TaskOffers/GetMyOffers",
    
    "Marketplace/Projects/GetProjects",
    
    "Communication/Sessions/GetSessions",
    "Communication/Sessions/CreateSession",
    "Communication/Sessions/ConfirmSession",
    "Communication/Sessions/CompleteSession",
    "Communication/Sessions/CancelSession",
    
    "Communication/Messages/GetConversations",
    "Communication/Messages/GetChatHistory",
    "Communication/Messages/SendMessage",
    "Communication/Messages/MarkAsRead",
    
    "Notifications/GetNotifications",
    "Notifications/MarkNotificationAsRead",
    "Notifications/MarkAllNotificationsAsRead",
    
    "Financial/Wallet/GetWallet",
    "Financial/Wallet/GetTransactions",
    
    "Reviews/CreateReview",
    "Reviews/GetReviewsForUser",
    
    "HelperProfileManagement/HelperServices/CreateService",
    "HelperProfileManagement/HelperServices/UpdateService",
    "HelperProfileManagement/HelperServices/DeleteService",
    "HelperProfileManagement/HelperServices/GetHelperServices",
    
    "HelperProfileManagement/HelperProjects/CreateProject",
    "HelperProfileManagement/HelperProjects/UpdateProject",
    "HelperProfileManagement/HelperProjects/DeleteProject",
    "HelperProfileManagement/HelperProjects/GetHelperProjects",
    
    "HelperProfileManagement/HelperSkills/AddSkillToHelper",
    "HelperProfileManagement/HelperSkills/RemoveSkill",
    
    "AI/Chat",
    "AI/Ingest"
)

$basePath = "c:\Users\User\Desktop\front-end wasla\WaslaSerga\Features"

foreach ($feature in $features) {
    $dir = Join-Path $basePath $feature
    $name = Split-Path $feature -Leaf
    
    # Calculate Namespace
    $relative = $feature -replace "/", "."
    $namespace = "WaslaSerga.Features.$relative"
    
    $endpointFile = Join-Path $dir "$name`Endpoint.cs"
    $requestFile = Join-Path $dir "$name`Request.cs"
    $handlerFile = Join-Path $dir "$name`Handler.cs"
    
    $endpointBody = @"
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WaslaSerga.Common.ResultPattern;

namespace $namespace;

[Route("api/[controller]")]
[ApiController]
// [Authorize]
public class $($name)Endpoint(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    // TODO: Map exact HTTP method and route from spec
    [HttpPost] 
    public async Task<IActionResult> Handle([FromBody] $($name)Request request, CancellationToken ct)
    {
        var result = await _mediator.Send(request, ct);
        return result.ToResponse();
    }
}
"@

    $requestBody = @"
using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace $namespace;

public record $($name)Request() : IRequest<Result<object>>;
"@

    $handlerBody = @"
using MediatR;
using WaslaSerga.Common.ResultPattern;

namespace $namespace;

public class $($name)Handler : IRequestHandler<$($name)Request, Result<object>>
{
    public async Task<Result<object>> Handle($($name)Request request, CancellationToken ct)
    {
        // TODO: Implement logic
        return Result.Success<object>(new { });
    }
}
"@

    Set-Content -Path $endpointFile -Value $endpointBody
    Set-Content -Path $requestFile -Value $requestBody
    Set-Content -Path $handlerFile -Value $handlerBody
    
    if ($name -match "^(Create|Update|Register|Login|Accept|Reject|Add|SendMessage|Complete|Confirm|Cancel|Change)") {
        $validatorFile = Join-Path $dir "$name`RequestValidator.cs"
        
        $validatorBody = @"
using FluentValidation;

namespace $namespace;

public class $($name)RequestValidator : AbstractValidator<$($name)Request>
{
    public $($name)RequestValidator()
    {
        // TODO: Add rules
    }
}
"@
        Set-Content -Path $validatorFile -Value $validatorBody
    }
}

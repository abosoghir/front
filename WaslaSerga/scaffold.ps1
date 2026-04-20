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
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    
    $name = Split-Path $feature -Leaf
    
    $endpointFile = Join-Path $dir "$name`Endpoint.cs"
    $requestFile = Join-Path $dir "$name`Request.cs"
    $handlerFile = Join-Path $dir "$name`Handler.cs"
    
    New-Item -ItemType File -Force -Path $endpointFile | Out-Null
    New-Item -ItemType File -Force -Path $requestFile | Out-Null
    New-Item -ItemType File -Force -Path $handlerFile | Out-Null
    
    # If the feature starts with Create, Update, Register, Login, we also probably need a validator
    if ($name -match "^(Create|Update|Register|Login|Accept|Reject|Add|SendMessage|Complete|Confirm|Cancel|Change)") {
        $validatorFile = Join-Path $dir "$name`RequestValidator.cs"
        New-Item -ItemType File -Force -Path $validatorFile | Out-Null
    }
}

$commonDirs = @(
    "Common/Enums",
    "Common/ResultPattern",
    "Entities",
    "Persistence"
)

foreach ($dir in $commonDirs) {
    $d = Join-Path "c:\Users\User\Desktop\front-end wasla\WaslaSerga" $dir
    New-Item -ItemType Directory -Force -Path $d | Out-Null
}

Write-Output "Scaffolding Complete"

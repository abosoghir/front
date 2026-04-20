namespace WaslaSerga.Common.Enums;

public enum TaskCategory { Technical, Design, Marketing, Writing, DataEntry, Translation, Consultation, Other }
public enum TaskStatus { Pending, Open, InProgress, Completed, Cancelled }
public enum TaskOfferStatus { Pending, Accepted, Rejected }
public enum ProjectCategory { WebDevelopment, MobileDevelopment, UIUXDesign, GraphicDesign, ContentWriting, DigitalMarketing, DataScience, Other }
public enum ProjectStatus { Draft, Open, InProgress, Completed, Cancelled }
public enum ServiceCategory { Technical, Design, Marketing, Writing, DataEntry, Translation, Consultation, Other }
public enum SessionStatus { Pending, Confirmed, Completed, Cancelled }
public enum MessageType { Text, Image, File, Task, Project, Session }
public enum ReviewType { Task, Project, Session }
public enum NotificationType { System, Task, Project, Session, Message, Payment, Review }
public enum TransactionType { Deposit, Withdrawal, Payment, Refund, Earning }
public enum TransactionStatus { Pending, Completed, Failed, Cancelled }
public enum CurrencyType { EGP, USD }

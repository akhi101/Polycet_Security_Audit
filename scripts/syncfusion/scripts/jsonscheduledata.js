﻿window.scheduleData = [{
    Id: 1,
    Subject: "Weekly Recurrence.",
    StartTime: new Date(2014,3,3,09,30),
    EndTime: new Date(2014,3,3,10,30),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;COUNT=10;INTERVAL=1;BYDAY=MO,TU"
},
    {
        Id: 2,
        Subject: "Project Review.",
        StartTime: new Date(2014,3,3,07,00),
        EndTime: new Date(2014,3,3,08,30),
		Description:"",
        AllDay: false,
        Recurrence:false
    },
    {
        Id: 3,
        Subject: "Daily Recurrence.",
        StartTime: new Date(2014,3,5,04,30),
        EndTime: new Date(2014,3,5,05,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=10"
    },
    {
        Id: 4,
        Subject: "Monthly Recurrence.",
        StartTime: new Date(2014,3,5,11,00),
        EndTime: new Date(2014,3,5,11,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=MONTHLY;COUNT=10;BYDAY=SU;BYSETPOS=1"
    },
    {
        Id: 5,
        Subject: "AllDay App.",
        StartTime: new Date(2014,3,1, 18, 30),
        EndTime: new Date(2014,3,2,18,29),
		Description:"",
        AllDay: true,
        Recurrence: false
    },
    {
        Id: 6,
        Subject: "Yearly Recurrence.",
        StartTime: new Date(2014,3,2,06,30),
        EndTime: new Date(2014,3,2,07,00),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=YEARLY;COUNT=10;BYMONTHDAY=2;BYMONTH=3"
    }];

window.Default = [{
    Id: 100,
    Subject: "Bering Sea Gold",
    StartTime: new Date(2014,4,2,06,00),
    EndTime:new Date(2014,4,2,08,00),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
    Categorize:"3"
},
    {
        Id: 101,
        Subject: "Bering Sea Gold",
        StartTime:new Date(2014,4,5,10,00),
        EndTime: new Date(2014,4,5,11,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "1,3"
    },
    {
        Id: 102,
        Subject: "Bering Sea Gold",
        StartTime:new Date(2014,4,2,16,00),
        EndTime:new Date(2014,4,2,17,30),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "2,5"
    },
    {
        Id: 103,
        Subject: "What Happened Next?",
        StartTime: new Date(2014,4,4,01,00),
        EndTime: new Date(2014,4,4,01,30),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "3,6"
    },
    {
        Id: 104,
        Subject: "What Happened Next?",
        StartTime: new Date(2014,4,5,12,30),
        EndTime: new Date(2014,4,5,15,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "4,1"
    }, {
        Id: 105,
        Subject: "Daily Planet",
        StartTime: new Date(2014,4,3,01,00),
        EndTime:new Date(2014,4,3,02,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "1,3,6"
    }, {
        Id: 106,
        Subject: "Alaska: The Last Frontier",
        StartTime: new Date(2014,4,3,04,00),
        EndTime: new Date(2014,4,3,05,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "2,3,4,5"
    }, {
        Id: 107,
        Subject: "How It's Made",
        StartTime: new Date(2014,4,1,06,00),
        EndTime: new Date(2014,4,1,07,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU;INTERVAL=1;COUNT=15",
        Categorize: "2,3,6"
    }, {
        Id: 108,
        Subject: "Deadest Catch",
        StartTime: new Date(2014,4,3,16,00),
        EndTime: new Date(2014,4,3,17,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "2,4,6,1"
    }, {
        Id: 109,
        Subject: "MayDay",
        StartTime: new Date(2014,3,30,06,30),
        EndTime: new Date(2014,3,30,07,30),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "5,3"
    }, {
        Id: 110,
        Subject: "MoonShiners",
        StartTime: new Date(2014,4,2,02,00),
        EndTime:  new Date(2014,4,2,02,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5",
        Categorize: "6,2,5"
    }, {
        Id: 111,
        Subject: "Close Encounters",
        StartTime: new Date(2014,3,30,14,00),
        EndTime: new Date(2014,3,30,15,00),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TH;INTERVAL=1;COUNT=5",
        Categorize: "3,4,5"
    }, {
        Id: 112,
        Subject: "Close Encounters",
        StartTime: new Date(2014,3,30,03,00),
        EndTime: new Date(2014,3,30,03,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;COUNT=3",
        Categorize: "5,2,1"
    }, {
        Id: 113,
        Subject: "HighWay Thru Hell",
        StartTime: new Date(2014,4,1,03,00),
        EndTime:new Date(2014,4,1,07,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "5,6,3"
    }, {
        Id: 114,
        Subject: "Moon Shiners",
        StartTime: new Date(2014,4,2,04,20),
        EndTime:new Date(2014,4,2,05,50),
		Description:"",
        AllDay: false,
        Recurrence: false,
        Categorize: "1,2,3,4,5,6"
    }, {
        Id: 115,
        Subject: "Cash Cab",
        StartTime:new Date(2014,3,30,15,00),
        EndTime: new Date(2014,3,30,16,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5",
        Categorize: "1,3"
    
	}
	
    ];
    window.ResourcesData = [{
        Id: 100,
        Subject: "Bering Sea Gold",
        StartTime:  new Date(2014,4,2,9,00),
        EndTime:  new Date(2014,4,2,10,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
        categoryId: 1, roomId: 2, ownerId: 3
    }, {
        Id: 101,
        Subject: "Hello Sea Gold",
        StartTime:  new Date(2014,4,2,4,00),
        EndTime: new Date(2014,4,2,5,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        categoryId: 1, roomId: 2, ownerId: 3
    }, {
        Id: 105,
        Subject: "Daily Planet",
        StartTime:  new Date(2014,4,5,5,00),
        EndTime:  new Date(2014,4,5,6,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
        categoryId: 1, roomId: 1, ownerId: 1
    }, {
        Id: 106,
        Subject: "Alaska: The Last Frontier",
        StartTime:  new Date(2014,4,3,4,00),
        EndTime:  new Date(2014,4,3,5,00),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
        categoryId: 1, roomId: 1, ownerId: 5
    }, {
        Id: 109,
        Subject: "MayDay",
        StartTime:  new Date(2014,3,30,06,30),
        EndTime: new Date(2014,3,30,07,30),
		Description:"",
        AllDay: false,
        Recurrence: false,
        categoryId: 1, roomId: 2, ownerId: 3
    }];
    window.HorizontalResourcesData = [{
        Id: 100,
        Subject: "Bering Sea Gold",
        StartTime: new Date(2014,4,5,9,00),
        EndTime: new Date(2014,4,5,10,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=10",
        categoryId: 1, roomId: 2, ownerId: 3
    }, {
        Id: 101,
        Subject: "Hello Sea Gold",
        StartTime: new Date(2014,4,2,04,00),
        EndTime:new Date(2014,4,2,05,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        categoryId: 1, roomId: 2, ownerId: 3
    }, {
        Id: 105,
        Subject: "Daily Planet",
        StartTime: new Date(2014,4,5,4,00),
        EndTime:  new Date(2014,4,5,6,00),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=5",
        categoryId: 1, roomId: 1, ownerId: 1
    }, {
        Id: 106,
        Subject: "Alaska: The Last Frontier",
        StartTime:  new Date(2014,4,3,04,00),
        EndTime:  new Date(2014,4,3,07,00),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=7",
        categoryId: 1, roomId: 1, ownerId: 5
    }, {
        Id: 109,
        Subject: "MayDay",
        StartTime:  new Date(2014,3,30,06,30),
        EndTime: new Date(2014,3,30,07,30),
		Description:"",
        AllDay: false,
        Recurrence: false,
        categoryId: 1, roomId: 2, ownerId: 3
    },
	{
        Id: 110,
        Subject: "MayDay",
        StartTime: new Date(2014,4,5,04,00),
        EndTime:new Date(2014,4,5,06,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        categoryId: 1, roomId: 2, ownerId: 3
    },
	 {
        Id: 111,
        Subject: "Alaska: The Last Frontier",
        StartTime:  new Date(2014,4,5,9,00),
        EndTime:  new Date(2014,4,5,11,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        categoryId: 1, roomId: 1, ownerId: 1
	 },
	 {
        Id: 112,
        Subject: "Hello Sea Gold",
        StartTime: new Date(2014,4,5,13,00),
        EndTime:new Date(2014,4,5,15,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        categoryId: 1, roomId: 2, ownerId: 3
	 },
	  {
        Id: 113,
        Subject: "Meeting",
        StartTime: new Date(2014,4,5,13,00),
        EndTime:new Date(2014,4,5,15,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        categoryId: 1, roomId: 3, ownerId:13 
	 },
	{
        Id: 114,
        Subject: "The Last Frontier",
        StartTime:  new Date(2014,4,5,9,00),
        EndTime:  new Date(2014,4,5,11,00),
		Description:"",
        AllDay: false,
        Recurrence: false,
        categoryId: 1, roomId: 3, ownerId: 15
	 }
    ];
window.Template = [{
    Id: 200,
    Subject: "Basketball Practice",
    StartTime:new Date(2014,4,2,04,00),
    EndTime: new Date(2014,4,2,05,00),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO;INTERVAL=1;COUNT=5"
}, {
    Id: 201,
    Subject: "Rugby Match",
    StartTime: new Date(2014,4,3,08,45),
    EndTime: new Date(2014,4,3,09,45),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU;INTERVAL=1;COUNT=5"
},
    {
        Id: 202,
        Subject: "Guitar Class",
        StartTime: new Date(2014,4,4,05,30),
        EndTime: new Date(2014,4,4,06,30),
		Description:"",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;COUNT=5"
    },
    {
        Id: 203,
        Subject: "Music Lessons",
        StartTime: new Date(2014,4,5,04,00),
        EndTime: new Date(2014,4,5,05,30),
        Description: "Highland Academy",
        AllDay: false,
        Recurrence: true,
        RecurrenceRule: "FREQ=WEEKLY;BYDAY=TH;INTERVAL=1;COUNT=5"
    },
{
    Id: 204,
    Subject: "Grandpa Birthday",
    StartTime: new Date(2014,4,4,00,00),
    EndTime: new Date(2014,4,4,01,00),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=SU;INTERVAL=1;COUNT=1"
},
{
    Id: 205,
    Subject: "No School (In-service)",
    StartTime:new Date(2014,4,7,05,00),
    EndTime: new Date(2014,4,7,06,30),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=SA;INTERVAL=1;COUNT=3"
},
{
    Id: 209,
    Subject: "Doctor checkup",
    StartTime:new Date(2014,4,8,10,15),
    EndTime: new Date(2014,4,8,11,30),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=FR;INTERVAL=2;COUNT=5"
}];

window.Startend = [
{
    Id: 400,
    Subject: "Brazil - Croatia",
    StartTime:new Date(2014,4,2,9,00),
    EndTime: new Date(2014,4,2,10,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 401,
    Subject: "Mexico - Cameroon",
    StartTime: new Date(2014,4,3,13,00),
    EndTime: new Date(2014,4,3,14,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 402,
    Subject: "Brazil - Mexico",
    StartTime:new Date(2014,4,7,6,00),
    EndTime: new Date(2014,4,7,7,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 403,
    Subject: "Cameroon - Croatia",
    StartTime: new Date(2014,4,5,4,00),
    EndTime: new Date(2014,4,5,5,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 404,
    Subject: "Cameroon - Brazil",
    StartTime: new Date(2014,4,13,17,00),
    EndTime: new Date(2014,4,13,18,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 405,
    Subject: "Croatia - Mexico",
    StartTime: new Date(2014,4,12,17,00),
    EndTime: new Date(2014,4,12,18,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 406,
    Subject: "Spain - Netherlands",
    StartTime: new Date(2014,4,3,16,00),
    EndTime: new Date(2014,4,3,17,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 407,
    Subject: "Chile - Australia",
    StartTime:  new Date(2014,4,3,18,00),
    EndTime:  new Date(2014,4,3,19,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 408,
    Subject: "Spain - Chile",
    StartTime:  new Date(2014,4,4,5,00),
    EndTime:new Date(2014,4,4,6,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 409,
    Subject: "Australia - Netherlands",
    StartTime: new Date(2014,4,8,8,30),
    EndTime: new Date(2014,4,8,9,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 410,
    Subject: "Australia - Chile",
    StartTime: new Date(2014,4,13,13,00),
    EndTime: new Date(2014,4,13,14,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},

{
    Id: 411,
    Subject: "Netherlands - Chile",
    StartTime:new Date(2014,4,12,13,00),
    EndTime: new Date(2014,4,12,14,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 412,
    Subject: "America - Brazil",
    StartTime: new Date(2014,4,9,5,00),
    EndTime: new Date(2014,4,9,6,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
 Id: 413,
    Subject: "Russia - London",
    StartTime: new Date(2014,4,6,7,00),
    EndTime: new Date(2014,4,6,9,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
 Id: 414,
    Subject: "France - Rome",
    StartTime: new Date(2014,4,10,7,00),
    EndTime: new Date(2014,4,10,8,30),
	Description:"",
    AllDay: false,
    Recurrence: false

}];

window.Timemode = [{
    Id: 500,
    Subject: "New training",
    StartTime: new Date(2014,4,2,10,00),
    EndTime: new Date(2014,4,2,11,30),
	Description:"",
    AllDay: false,
    Recurrence: false
}, {
    Id: 501,
    Subject: "Conference meeting",
    StartTime: new Date(2014,4,7,11,00),
    EndTime: new Date(2014,4,7,12,30),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TH;INTERVAL=2;COUNT=20"
}, {
    Id: 502,
    Subject: "Product meeting",
    StartTime: new Date(2014,4,4,4,00),
    EndTime: new Date(2014,4,4,5,00),
	Description:"",
    AllDay: false,
    Recurrence: false
}, {
    Id: 503,
    Subject: "Evaluation review",
    StartTime: new Date(2014,4,1,16,00),
    EndTime: new Date(2014,4,1,17,00),
	Description:"",
    AllDay: false,
    Recurrence: false
}, {
    Id: 504,
    Subject: "Case study",
    StartTime: new Date(2014,4,1, 18, 30),
    EndTime: new Date(2014,4,3,18,29),
	Description:"",
    AllDay: true,
    Recurrence: false
},
{
    Id: 505,
    Subject: "Evaluation review",
    StartTime: new Date(2014,4,5,9,00),
    EndTime: new Date(2014,4,5,10,00),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 506,
    Subject: "Case study",
   StartTime: new Date(2014, 4, 5, 18, 00),
    EndTime: new Date(2014, 4, 6, 18, 30),
	Description:"",
    AllDay: true,
    Recurrence: false
},
{
 Id: 507,
    Subject: "New training",
    StartTime: new Date(2014,4,7,8,00),
    EndTime: new Date(2014,4,7,9,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
 Id: 508,
    Subject: "New training",
    StartTime: new Date(2014,4,9,6,00),
    EndTime: new Date(2014,4,9,8,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
 Id: 509,
    Subject: "Product meeting",
    StartTime: new Date(2014,4,10,4,00),
    EndTime: new Date(2014,4,10,5,30),
	Description:"",
    AllDay: false,
    Recurrence: false
}
	];

window.Viewcustomization = [{ Id: 600,
    Subject: "Ladies Mogals Qualification",
    StartTime:new Date(2014,4,2,18,00),
    EndTime: new Date(2014,4,2,20,00),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=2;COUNT=6"
}, {
    Id: 601,
    Subject: "Men's Mogals Qualification",
    StartTime: new Date(2014,4,2,14,00),
    EndTime: new Date(2014,4,2,16,00),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;COUNT=12"
}, {
    Id: 602,
    Subject: "Men's 500m race",
    StartTime:new Date(2014,4,3,17,00),
    EndTime: new Date(2014,4,3,18,00),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5"
}, {
    Id: 603,
    Subject: "Opening ceremony",
    StartTime: new Date(2014,4,1,09,00),
    EndTime: new Date(2014,4,1,12,00),
	Description:"",
    AllDay: false,
    Recurrence: false
}, {
    Id: 604,
    Subject: "Finals",
    StartTime: new Date(2014,4,4,10,00),
    EndTime: new Date(2014,4,4,17,30),
	Description:"",
    AllDay: false,
    Recurrence: false
}, {
    Id: 605,
    Subject: "Final presentation",
    StartTime: new Date(2014,4,4,18,00),
    EndTime: new Date(2014,4,4,19,30),
	Description:"",
    AllDay: false,
    Recurrence: false
}];

window.Events = [{
    Id: 700,
    Subject: "Packing Day",
    StartTime: new Date(2014,4,2,05,00),
    EndTime:  new Date(2014,4,2,05,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 701,
    Subject: "Spring Break",
    StartTime:  new Date(2014,4,4,06,00),
    EndTime:new Date(2014,4,4,07,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 702,
    Subject: "Registration for Spring Term",
    StartTime: new Date(2014,4,2,07,00),
    EndTime: new Date(2014,4,2,07,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 703,
    Subject: "Last meal of winter term in LDC",
    StartTime: new Date(2014,4,2,03,00),
    EndTime: new Date(2014,4,2,04,50),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 704,
    Subject: "Sayles Cafe - Reduced Hours",
    StartTime: new Date(2014,3,30,08,00),
    EndTime: new Date(2014,3,30,09,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 705,
    Subject: "Bookstore Break Hours",
    StartTime: new Date(2014,4,2,08,30),
    EndTime: new Date(2014,4,2,09,00),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 706,
    Subject: "CFR 'Office Hours'",
    StartTime: new Date(2014,4,2,11,30),
    EndTime: new Date(2014,4,2,13,00),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 707,
    Subject: "Used Textbook Buyback/Text Rental Return",
    StartTime: new Date(2014,4,3,10,00),
    EndTime: new Date(2014,4,3,13,00),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 708,
    Subject: "Halls and Houses Close for winter Term at 2 p.m.",
    StartTime:new Date(2014,4,2,14,00),
    EndTime:new Date(2014,4,2,15,00),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 709,
    Subject: "Dining Dollars Expire Today at 2:00 pm",
    StartTime: new Date(2014,4,1,14,00),
    EndTime: new Date(2014,4,1,16,00),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 710,
    Subject: "Last meal of winter term in LDC",
    StartTime: new Date(2014,4,5,4,00),
    EndTime: new Date(2014,4,5,6,00),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 711,
    Subject: "Halls and Houses Close for winter Term at 2 p.m.",
    StartTime: new Date(2014,4,6,7,00),
    EndTime: new Date(2014,4,6,8,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 712,
    Subject: "Used Textbook Buyback/Text Rental Return",
    StartTime: new Date(2014,4,7,9,00),
    EndTime: new Date(2014,4,7,10,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 713,
    Subject: "Bookstore Break Hours",
    StartTime: new Date(2014,4,8,6,00),
    EndTime: new Date(2014,4,8,7,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 714,
    Subject: "Registration for Spring Term",
    StartTime: new Date(2014,4,9,5,00),
    EndTime: new Date(2014,4,9,6,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{
    Id: 715,
    Subject: "Packing Day",
    StartTime: new Date(2014,4,10,7,00),
    EndTime: new Date(2014,4,10,8,30),
	Description:"",
    AllDay: false,
    Recurrence: false

}];

window.API = [{
    Id: 800,
    Subject: "Elementary italian I",
    StartTime: new Date(2014,4,4,4,00),
    EndTime: new Date(2014,4,4,5,30),
    Description: "",
    Priority:"medium",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH;INTERVAL=1;COUNT=12"
}, {
    Id: 801,
    Subject: "Earth: Our Habitable Planet(lecture)",
    StartTime:new Date(2014,4,5,6,30),
    EndTime: new Date(2014,4,5,7,30),
    Description: "",
    Priority: "high",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;COUNT=6"
}, {
    Id: 802,
    Subject: "Earth: Our Habitable Planet(lecture)",
    StartTime:new Date(2014,4,2,12,20),
    EndTime: new Date(2014,4,2,14,15),
    Description: "",
    Priority: "low",
    AllDay: false,
    Recurrence: false
}, {
    Id: 803,
    Subject: "Yoga",
    StartTime: new Date(2014,4,2,12,20),
    EndTime:  new Date(2014,4,2,14,15),
    Description: "",
    Priority:"high",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=FR;INTERVAL=1;COUNT=3"
}, {
    Id: 804,
    Subject: "Intro to Computers(lab)",
    StartTime:  new Date(2014,4,2,14,30),
    EndTime:  new Date(2014,4,2,15,45),
    Description: "",
    Priority: "low",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,WE;INTERVAL=1;COUNT=6"
}, { Id: 805,
    Subject: "Intro to Computers(lecture)",
    StartTime:  new Date(2014,4,2,15,35),
    EndTime: new Date(2014,4,2,16,25),
    Description: "",
    Priority: "none",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;COUNT=6"
}, { Id: 806,
    Subject: "Basic Carrier Development",
    StartTime:  new Date(2014,4,2,16,00),
    EndTime:  new Date(2014,4,2,17,15),
    Description: "",
    Priority: "medium",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,WE;INTERVAL=1;COUNT=6"
}, { Id: 807,
    Subject: "InterPersonal Comm.",
    StartTime:  new Date(2014,4,2,17,45),
    EndTime:  new Date(2014,4,2,19,00),
    Description: "",
    Priority: "low",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU,TH;INTERVAL=1;COUNT=6"
} ];

window.Keyboard = [{ Id: 900,
    Subject: "Review lesson plans for the day",
    StartTime:  new Date(2014,4,2,09,00),
    EndTime: new Date(2014,4,2,09,30),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=5"
}, { Id: 901,
    Subject: "Philosophy",
    StartTime:  new Date(2014,4,2,09,30),
    EndTime:  new Date(2014,4,2,10,00),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=TU,WE,TH;INTERVAL=1;COUNT=9"
}, { Id: 902,
    Subject: "Grammer with sharley English",
    StartTime:  new Date(2014,4,2,10,00),
    EndTime:  new Date(2014,4,2,11,00),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=MONTHLY;BYDAY=WE;BYSETPOS=1;COUNT=6"
}, { Id: 903,
    Subject: "Lunch",
    StartTime:  new Date(2014,4,2,13,00),
    EndTime: new Date(2014,4,2,14,00),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10"
}, { Id: 904,
    Subject: "Prayer",
    StartTime:  new Date(2014,4,2,08,00),
    EndTime:  new Date(2014,4,2,08,15),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=DAILY;INTERVAL=1;COUNT=20"
}];

window.Localization = [{ Id: 1000,
    Subject: "Men's Prelim. Round SVK - SLO",
    StartTime:  new Date(2014,4,4,10,00),
    EndTime:  new Date(2014,4,4,11,30),
	Description:"",
    AllDay: false,
    Recurrence: false
},
{ Id: 1001,
    Subject: "Women's Play-offs Quarterfinals",
    StartTime:  new Date(2014,4,5,4,30),
    EndTime: new Date(2014,4,5,6,00),
	Description:"",
    AllDay: false,
    Recurrence: false
}, { Id: 1002,
    Subject: "Women's Prelim. Round JPN - GER",
    StartTime:  new Date(2014,4,6,7,00),
    EndTime:  new Date(2014,4,6,8,30),
	Description:"",
    AllDay: false,
    Recurrence: false
}, { Id: 1003,
    Subject: "Men's Prelim. Round FIN - AUT",
    StartTime: new Date(2014,4,7,9,30),
    EndTime:  new Date(2014,4,7,10,35),
	Description:"",
    AllDay: false,
    Recurrence: false
}, { Id: 1004,
    Subject: "Women's Preim. Round SUI -FIN",
    StartTime:new Date(2014,4,8,6,00),
    EndTime: new Date(2014,4,8,7,30),
	Description:"",
    AllDay: false,
    Recurrence: false
}, { Id: 1005,
    Subject: "Men's Prelim Round RUS - SVK",
    StartTime: new Date(2014,4,9,5,00),
    EndTime:new Date(2014,4,9,6,15),
	Description:"",
    AllDay: false,
    Recurrence: false
}, { Id: 1006,
    Subject: "Women's Classifications RUS - JPN",
    StartTime: new Date(2014,4,10,9,00),
    EndTime: new Date(2014,4,10,11,00),
	Description:"",
    AllDay: false,
    Recurrence: false
}, { Id: 1007,
    Subject: "Men's Play-offs Semifinals CAN - SUI",
    StartTime: new Date(2014,4,4,16,30),
    EndTime: new Date(2014,4,4,18,00),
	Description:"",
    AllDay: false,
    Recurrence: false
}, { Id: 1008,
    Subject: "Women's Play-offs Semifinals USA - SWE",
    StartTime: new Date(2014,4,4,21,00),
    EndTime: new Date(2014,4,4,22,00),
	Description:"",
    AllDay: false,
    Recurrence: false
}, { Id: 1009,
    Subject: "Finals SUI - SWE",
    StartTime: new Date(2014,4,5,16,00),
    EndTime: new Date(2014,4,5,18,00),
	Description:"",
    AllDay: false,
    Recurrence: false
}];

window.RTL = [{ Id: 1100,
    Subject: "Chemistry I (lecture)",
    StartTime: new Date(2014,4,2,9,00),
    EndTime: new Date(2014,4,2,9,55),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,FR;INTERVAL=1;COUNT=12"
},
{ Id: 1101,
    Subject: "Elementary Composition",
    StartTime:  new Date(2014,4,2,11,15),
    EndTime:  new Date(2014,4,2,12,05),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=12"
},
{ Id: 1102,
    Subject: "Managing Resources for learning",
    StartTime:  new Date(2014,4,3,11,15),
    EndTime:  new Date(2014,4,3,12,05),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=DAILY;INTERVAL=2;COUNT=12"
},
{ Id: 1103,
    Subject: "Calculus I (lecture)",
    StartTime:  new Date(2014,4,2,13,25),
    EndTime: new Date(2014,4,2,14,15),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,WE,TH,FR;INTERVAL=1;COUNT=12"
},
{ Id: 1104,
    Subject: "Chemistry I (lab)",
    StartTime:  new Date(2014,4,2,14,30),
    EndTime:  new Date(2014,4,2,17,30),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=TH;INTERVAL=1;COUNT=4"
},
{ Id: 1105,
    Subject: "Chemistry I (discussion)",
    StartTime:  new Date(2014,4,2,16,40),
    EndTime:  new Date(2014,4,2,17,30),
	Description:"",
    AllDay: false,
    Recurrence: true,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=WE;INTERVAL=1;COUNT=4"
}];

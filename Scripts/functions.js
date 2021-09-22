/*
Author: Abhijeet Dharpawar
*/

function showCurrentDate() {
    var now = new Date();
    //$("#dvDate").html("Today:" + dateFormat(now, "dddd, mmmm dd, yyyy"));
}

function setLanguage(lang) {
    //debugger;
    $.removeCookie('language');
    var culture = (lang === "eng") ? "en-US" : "mr-IN";
    $.cookie("language", culture);
    window.location.reload();
}

function setEventDetails() {
    var culture = $.cookie('language');

    $.get("Content/Event.xml", {}, function (xml) {
        var data;
        if (typeof xml == 'string') {
            data = new ActiveXObject('Microsoft.XMLDOM');
            data.async = false;
            data.loadXML(xml);
        } else {
            data = xml;
        }

        $(data).find('Culture').each(function () {

            if ($(this).attr('value') === culture) {
                var name = $(this).find('Name').text();
                var detail = $(this).find('Details').text();
                var shortDescription;
                //var shortDescription = $(this).find("ShortDescription").text();
                //debugger;
                $(this).find('ShortDescription').each(function () {
                    //shortDescription = $(this).text();
                    $(EventDetails).html($(this).text());
                });

                var date = $(this).find('Date').text();
                var time = $(this).find('Time').text();
                var Venue = $(this).find('Venue').text();

                $("#EventName").html(name);
                $("#EventDate").html(date);
                $("#EventTime").html(time);
                $("#EventAddress").html(Venue);
                var id = $(this).find('Id').text();               
                $("#btnMoreDetailsEvents").click(function () {
                    showEventDetails(id);
                });
            }
        });

    }, 'xml');
}

function setLinks() {
    var culture = $.cookie('language');

    $("#logo").find("a").attr("href", "index.html");

    $.get("Content/PageContent.xml", {}, function (xml) {
        var data;
        if (typeof xml == 'string') {
            data = new ActiveXObject('Microsoft.XMLDOM');
            data.async = false;
            data.loadXML(xml);
        } else {
            data = xml;
        }

        $(data).find('Culture').each(function () {

            if ($(this).attr('value') === culture) {
                $("#aHome").text($(this).find('aHome').text());
                $("#aAboutUs").text($(this).find('aAboutUs').text());
                $("#aEvents").text($(this).find('aEvents').text());
                $("#aBecomeMember").text($(this).find('aBecomeMember').text());
                $("#aCommittee").text($(this).find('aCommittee').text());
                $("#aPhotoGallery").text($(this).find('aPhotoGallery').text());
                $("#aFAQ").text($(this).find('aFAQ').text());
                $("#aContactUs").text($(this).find('aContactUs').text());

                //Event Header
                $("#EventHeader").html($(this).find('EventHeader').text());
                $("#EventDateHeader").html($(this).find('EventDateHeader').text());
                $("#EventTimeHeader").html($(this).find('EventTimeHeader').text());
                $("#EventAddressHeader").html($(this).find('EventAddressHeader').text());
                $("#btnMoreDetailsEvents").val($(this).find('btnMoreDetailsEvents').text());
                $("#btnRSVPEvents").val($(this).find('btnRSVPEvents').text());
                //Hide the RSVP link for time being

                //Additional Links
                $("#UsefulLinks").val($(this).find('UsefulLinksHeader').text());
                $("#AboutNashville").val($(this).find('AboutNashvilleHeader').text());
                $("#BeASponsor").val($(this).find('BeASponsorHeader').text());

                //Page Header Date
                var DateHeaderText = $(this).find('TodayHeader').text();
                var now = new Date();
                $("#dvPageDate").html(DateHeaderText + dateFormat(now, "dddd, mmmm dd, yyyy"));

                
                

                //Footer
                $("#FooterContent").html($(this).find('FooterContent').text());
            }
        });

    }, 'xml');
}



function setDefaultCulture() {
    if ($.cookie('language') === undefined) {
        //debugger;
        $.cookie("language", "mr-IN");
    }
    if ($.cookie('language') === "mr-IN") {
        $("#translations").find("a").each(function () {
            $(this).removeClass("greenbtn");
            if ($(this).text() != "a") {
                $(this).addClass("greenbtn");
            }
        });
    }
    else {
        $("#translations").find("a").each(function () {
            $(this).removeClass("greenbtn");
            if ($(this).text() === "a") {
                $(this).addClass("greenbtn");
            }
        });
    }
}

function parseXml(xml) {
    if (jQuery.browser.msie) {
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.loadXML(xml);
        xml = xmlDoc;
    }
    return xml;
}

function initializePageContent() {

    setDefaultCulture();
    setLinks();
    //showCurrentDate();
    setEventDetails();

    $("#aFacebook").attr("href", "https://www.facebook.com/MarathiMandalOfTennessee/");
    $("#aYouTube").attr("href", "http://www.youtube.com/user/tnmmnashville");

    $("#btnRSVPEvents").click(function () {
        window.open("http://evite.me/FWrSfpnEmT");
    });

    $("#UsefulLinks").click(function () {
        //window.location.replace("UsefulLinks.html");
        window.location.href = "UsefulLinks.html";
    });
    $("#AboutNashville").click(function () {
        //window.location.replace("AboutNashville.html");
        window.location.href = "AboutNashville.html";
    });
    $("#BeASponsor").click(function () {
        //window.location.replace("BecomeASponsor.html");
        window.location.href = "BecomeASponsor.html";
    });

    $(".Ad").click(function () {
        //window.location.replace("BecomeASponsor.html");
        window.location.href = "BecomeASponsor.html";
    });

    //read from xml file for Upcoming Event

}

function showEventDetails(eventName) {    
    $.removeCookie('selectedEvent');
    $.cookie('selectedEvent', eventName);
    window.location.href = "EventDetails.html"; //  replace("EventDetails.html");
}

function loadHomePageContent() {
    loadPageContent("home");
}

function loadAboutUsPageContent() {
    loadPageContent("aboutus");
}

function loadContactUsContent() {
    loadPageContent("contactus");
}

function loadPhotoGalleryContent() {
    loadPageContent("photogallery");
}

function loadFAQContent() {
    loadPageContent("faq");
}

function loadEventsPageContent() {
    loadPageContent("events");
}

function loadEventDetailsPageContent() {
    loadPageContent("eventdetails");
}

function loadCommitteeContent() {
    loadPageContent("committee");
}

function loadBecomeMemberContent() {
    loadPageContent("becomemember");
}

function loadBecomeSponsorContent() {
    loadPageContent("becomesponsor");
}

function loadAboutNashvilleContent() {
    loadPageContent("aboutnashville");
}

function loadUsefulLinksContent() {
    loadPageContent("usefullinks");
}


function loadPageContent(pageName) {
    var culture = $.cookie('language');

    $.get("Content/PageContent.xml", {}, function (xml) {
        var data;
        if (typeof xml == 'string') {
            data = new ActiveXObject('Microsoft.XMLDOM');
            data.async = false;
            data.loadXML(xml);
        } else {
            data = xml;
        }

        $(data).find('Culture').each(function () {

            if ($(this).attr('value') === culture) {

                if (pageName === "aboutus") {
                    $("#pageContentHeader").html($(this).find('AboutUsPageHeader').text());
                    $("#dvPageContent").html($(this).find('AboutUsContent').text());
                }
                else if (pageName === "contactus") {
                    $("#pageContentHeader").html($(this).find('ContactUsPageHeader').text());
                    $("#dvPageContent").html($(this).find('ContactUsContent').text());
                }
                else if (pageName === "photogallery") {
                    $("#pageContentHeader").html($(this).find('PhotoGalleryPageHeader').text());
                    $("#dvPageContent").html($(this).find('PhotoGalleryContent').text());
                }
                else if (pageName === "faq") {
                    $("#pageContentHeader").html($(this).find('FAQPageHeader').text());
                    $("#dvPageContent").html($(this).find('FAQContent').text());
                }
                else if (pageName === "events") {
                    $("#pageContentHeader").html($(this).find('EventsPageHeader').text());
                    $("#dvPageContent").html($(this).find('EventsContent').text());
                }
                else if (pageName === "eventdetails") {
                    var eventName = $.cookie('selectedEvent');
                    $("#pageContentHeader").html($(this).find(eventName + '_Header').text());
                    $("#dvPageContent").html($(this).find(eventName).text());
                }
                else if (pageName === "committee") {
                    $("#pageContentHeader").html($(this).find('CommitteePageHeader').text());
                    $("#dvPageContent").html($(this).find('CommitteeContent').text());
                }
                else if (pageName === "becomemember") {
                    $("#pageContentHeader").html($(this).find('BecomeMemberPageHeader').text());
                    $("#dvPageContent").html($(this).find('MembersContent').text());
                }
                else if (pageName === "becomesponsor") {
                    $("#pageContentHeader").html($(this).find('BecomeSponsorPageHeader').text());
                    $("#dvPageContent").html($(this).find('SponsorContent').text());
                }
                else if (pageName === "aboutnashville") {
                    $("#pageContentHeader").html($(this).find('AboutNashvillePageHeader').text());
                    $("#dvPageContent").html($(this).find('AboutNashvilleContent').text());
                }
                else if (pageName === "usefullinks") {
                    $("#pageContentHeader").html($(this).find('UsefulLinksPageHeader').text());
                    $("#dvPageContent").html($(this).find('UsefulLinksContent').text());
                }
                else {
                    //                    $("#pageContentHeader").html(" ");
                    //                    $("#dvPageContent").html($(this).find('AboutUsContent').text());
                    //Home page Content
                    $("#pageContentHeader").html($(this).find('HomePageHeader').text());
                    $("#dvPageContent").html($(this).find('dvPageContent').text());
                }
            }
        });

    }, 'xml');
}


/*
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*/

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
} ();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

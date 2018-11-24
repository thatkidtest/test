var indentifier = Math.floor(Math.random() * 10000000);
var ID = "ID: "+indentifier;
console.log(ID);
console.log("Update 2");

var json = {
    questions: [
        {
            type: "matrix",
            name: "Quality",
            title: "Please rate the following statements to the best of your ability",
            isAllRowRequired: "true",
            columns: [
                {
                    value: 1,
                    text: "Never"
                }, {
                    value: 2,
                    text: "Rarely"
                }, {
                    value: 3,
                    text: "Sometimes"
                }, {
                    value: 4,
                    text: "Often"
                }, {
                    value: 5,
                    text: "Always"
                }
            ],
            rows: [
                {
                    value: "1",
                    text: "I correct my professor.",
                }, {
                    value: "2",
                    text: "I speak more frequently than my peers."
                }, {
                    value: "3",
                    text: "My peers make meaningful contributions to discussions."
                }, {
                    value: "4",
                    text: "I make meaningful contributions to discussions."
                }, {
                    value: "5",
                    text: "Professors stop me while I am speaking in class."
                }, {
                    value: "6",
                    text: "Professors ask me to speak and participate in discussions because I am too quiet."
                }, {
                    value: "7",
                    text: "I interrupt my professor."
                }, {
                    value: "8",
                    text: "I speak without raising my hand, even when others do not."
                }, {
                    value: "9",
                    text: "I have underqualified professors."
                }, {
                    value: "10",
                    text: "I answer my peers' questions before my professor does."
                }, {
                    value: "11",
                    text: "I refer to texts that were not assigned for class."
                }, {
                    value: "12",
                    text: "I discuss assigned readings even when I did not do the readings because I can make\
                            a meaningful contribution without having read it."
                }
            ],
        }
    ],
    completedHtml:" "
};

Survey.defaultBootstrapCss.navigationButton = "btn btn-primary btn-xl";
Survey.Survey.cssType = "bootstrap";

var result1;
var result2;

var model = new Survey.Model(json);
model
    .onComplete
    .add(function (result) {
        result1 = result;
        document.getElementById("intro2_div").style.display = "block";
        document.getElementById('portfolio').scrollIntoView(true);
    });

$("#surveyElement").Survey({model:model});

function continueFunc() {
    document.getElementById("intro1").innerHTML = "";
    document.getElementById("surveyElement").style.display = "inline-block";
    document.getElementById("continueButton").style.display = "none";
}

var json2 = {
    questions: [
        {
            type: "matrix",
            name: "Quality",
            title: "Please answer as accurately as possible. (1: completetely disagree, 7: completely agree)",
            isAllRowRequired: "true",
            columns: [
                {
                    value: 1,
                    text: "1"
                }, {
                    value: 2,
                    text: "2"
                }, {
                    value: 3,
                    text: "3"
                }, {
                    value: 4,
                    text: "4"
                }, {
                    value: 5,
                    text: "5"
                }, {
                    value: 6,
                    text: "6"
                }, {
                    value: 7,
                    text: "7"
                }
            ],
            rows: [
                {
                    value: "1",
                    text: "My peers overestimate my intelligence."
                }, {
                    value: "2",
                    text: "I am comfortable speaking in class."
                }, {
                    value: "3",
                    text: "You do not have to raise your hand in class to speak."
                }, {
                    value: "4",
                    text: "My professors underestimate my intelligence."
                }, {
                    value: "5",
                    text: "My essays deserve better grades."
                }, {
                    value: "6",
                    text: "It is okay to interrupt my peers when they are speaking if I have a very good point."
                }, {
                    value: "7",
                    text: "My peers underestimate my intelligence."
                }, {
                    value: "8",
                    text: "It is okay to interrupt the professor when they are speaking if I have a very good point."
                }, {
                    value: "9",
                    text: "I have great ideas in class."
                }, {
                    value: "10",
                    text: "My professors overestimate my intelligence."
                }, {
                    value: "11",
                    text: "Peers and professors do not seem to understand my point right away, so I have to elaborate for a long time."
                }, {
                    value: "12",
                    text: "I am intelligent."
                }, {
                    value: "13",
                    text: "I am a that kid."
                }
            ],
        }
    ],
    completedHtml:" "
};


var model2 = new Survey.Model(json2);
model2
    .onComplete
    .add(function (result) {
        result2 = result;
        console.log("result1: " + JSON.stringify(result1.data));
        console.log("result2: " + JSON.stringify(result2.data));

        var results_string = JSON.stringify(result1.data) + " " + JSON.stringify(result2.data);

        var tkness = 0.0;
        var tkness_count = 0;

        var hostility = 0.0;
        var hostility_count = 0;

        var faculty = 0.0;
        var faculty_count = 0;

        var peer = 0.0;
        var peer_count = 0;

        var intelligence = 0.0;
        var intelligence_count = 0;
        var multiplier = 1;
        result1 = result1.data["Quality"];
        result2 = result2.data["Quality"];

        function parseInt2(a) {
        	return parseInt(a) - 1;
        }

        //result1:
        
        multiplier = 1;
        if (parseInt2(result1["1"]) > 1) multiplier = 2;
        tkness += parseInt2(result1["1"])/4.0;
        tkness_count++;
        hostility += multiplier * parseInt2(result1["1"]) / 4.0;
        hostility_count++;
        faculty += multiplier * parseInt2(result1["1"]) / 4.0;
        faculty_count++;

        tkness += parseInt2(result1["2"]) / 4.0;
        tkness_count++;
        peer += parseInt2(result1["2"]) / 4.0;
        peer_count++;

        tkness += (5 - parseInt2(result1["3"])) / 4.0;
        tkness_count++;
        peer += (5 - parseInt2(result1["3"])) / 4.0;
        peer_count++;
        hostility += (5 - parseInt2(result1["3"])) / 4.0;
        hostility_count++;

        tkness += parseInt2(result1["4"]) / 4.0;
        tkness_count++;

        tkness += parseInt2(result1["5"]) / 4.0;
        tkness_count++;
        faculty += parseInt2(result1["5"]) / 4.0;
        faculty_count++;

        tkness += (5 - parseInt2(result1["6"])) / 4.0;
        tkness_count++;
        peer += (5 - parseInt2(result1["6"])) / 4.0;
        peer_count++;
        faculty += (5 - parseInt2(result1["6"])) / 4.0;
        faculty_count++;

        multiplier = 1;
        if (parseInt2(result1["7"]) > 1) multiplier = 2;
        tkness += multiplier * parseInt2(result1["7"]) / 4.0;
        tkness_count++;
        hostility += multiplier * parseInt2(result1["7"]) / 4.0;
        hostility_count++;
        faculty += multiplier * parseInt2(result1["7"]) / 4.0;
        faculty_count++;

        tkness += parseInt2(result1["8"]) / 4.0;
        tkness_count++;
        hostility += parseInt2(result1["8"]) / 4.0;
        hostility_count++;
        faculty += parseInt2(result1["8"]) / 4.0;
        faculty_count++;
        peer += parseInt2(result1["8"]) / 4.0;
        peer_count++;

        tkness += parseInt2(result1["9"]) / 4.0;
        tkness_count++;
        hostility += parseInt2(result1["9"]) / 4.0;
        hostility_count++
        faculty += parseInt2(result1["9"]) / 4.0;
        faculty_count++;

        tkness += parseInt2(result1["10"]) / 4.0;
        tkness_count++;
        peer += parseInt2(result1["10"]) / 4.0;
        peer_count++;

        tkness += parseInt2(result1["11"]) / 4.0;
        tkness_count++;

        tkness += parseInt2(result1["12"]) / 4.0;
        tkness_count++;

        //result2:
        tkness += (7 - parseInt2(result2["1"])) / 6.0;
        tkness_count++;
        peer += (7 - parseInt2(result2["1"])) / 6.0;
        peer_count++;

        tkness += parseInt2(result2["2"]) / 6.0;
        tkness_count++;

        tkness += parseInt2(result2["3"]) / 6.0;
        tkness_count++;
        peer += parseInt2(result2["3"]) / 6.0;
        peer_count++;
        hostility += parseInt2(result2["3"]) / 6.0;
        hostility_count++;

        tkness += parseInt2(result2["4"]) / 6.0;
        tkness_count++;
        faculty += parseInt2(result2["4"]) / 6.0;
        faculty_count++;

        tkness += parseInt2(result2["5"]) / 6.0;
        tkness_count++;
        faculty += parseInt2(result2["5"]) / 6.0;
        faculty_count++;

        tkness += parseInt2(result2["6"]) / 6.0;
        tkness_count++;
        peer += parseInt2(result2["6"]) / 6.0;
        peer_count++;
        hostility += parseInt2(result2["3"]) / 6.0;
        hostility_count++;

        tkness += parseInt2(result2["7"]) / 6.0;
        tkness_count++;
        peer += parseInt2(result2["7"]) / 6.0;
        peer_count++;

        //interrupt profs
        var multiplier = 1;
        if (parseInt2(result2["8"]) > 1) multiplier = 2.5;
        tkness += parseInt2(result2["8"]) / 6.0;
        tkness_count++;
        faculty += multiplier * parseInt2(result2["8"]) / 6.0;
        faculty_count++;
        hostility += multiplier * parseInt2(result2["8"]) / 6.0;
        hostility_count++;

        tkness += parseInt2(result2["9"]) / 6.0;
        tkness_count++;

        tkness += (7 - parseInt2(result2["10"])) / 6.0;
        tkness_count++;
        faculty += (7 - parseInt2(result2["10"])) / 6.0;
        faculty_count++;

        tkness += parseInt2(result2["11"]) / 6.0;
        tkness_count++;
        peer += parseInt2(result2["11"]) / 6.0;
        peer_count++;
        faculty += parseInt2(result2["11"]) / 6.0;
        faculty_count++;

        intelligence += parseInt2(result2["12"]) / 6.0;
        intelligence_count++;

        tkness += parseInt2(result2["13"]) / 6.0;
        tkness_count++;

        var tkness_percent = (tkness/tkness_count) - 0.08;
        if (tkness_percent <= 0)
        	tkness_percent = 0.01;
        var intelligence_percent = intelligence/intelligence_count;
        var hostility_percent = hostility/hostility_count;
        var peer_percent = peer/peer_count;
        var faculty_percent = faculty/faculty_count;
        faculty_percent += 0.1

        console.log("tkness: "+ tkness + " count " + tkness_count +" TKNESS: " + tkness_percent
            + "\nHOSTILITY: " + hostility_percent
            + "\nPEER: " + peer_percent
            + "\nFACULTY: " + faculty_percent);

        var names = {
            "IHF":"The Critic",
     		"IHP":"The Asshole",
            "IHA":"The Asshole",
            "INP":"The Guest Lecturer",
            "INF":"The Disciple",
            "INA":"The Uninvited Philosopher",
            "UHF":"The Heckler",
            "UHP":"The Brute",
            "UHA":"The Flailer",
            "UNA":"The Rambler",
            "UNF":"The Tryhard"
        };

        var description = "";
        var tktype = "";
        if (intelligence_percent >= .5) {
            tktype += "I";
            description += " <b>I</b>ntelligent";
        }
        else {
            tktype += "U";
            description += " <b>U</b>nintelligent";
        }
        if (hostility_percent >= .5) {
            tktype += "H";
            description += " <b>H</b>ostile";
        }
        else{
            tktype += "N";
            description += " <b>N</b>on-hostile";
        }
        /*
        if ((tktype == "UN") || peer_percent > .5 && faculty_percent > .5) {
        	tktype += "A";
        	description += " <b>A</b>ll-inclusive";
        }
        */
        if ((tktype == "UN") || (Math.abs(peer_percent - faculty_percent) <= .05)) {
        	tktype += "A";
        	description += " <b>A</b>ll-inclusive";
        }
        else{
	        if (peer_percent > faculty_percent) {
	            tktype += "P";
	            description += " <b>P</b>eer-oriented";
	        }
	        else{
	            tktype += "F";
	            description += " <b>F</b>aculty-oriented";
	        }
	    }
        var story = "</br></br><font size=5>";
        switch (tktype) {
            case "IHF":
                story += "Uh-oh, looks like your professor has overgeneralized Plato’s explication of the divided line again. Well, someone’s gotta properly express the nuances between the formal nature of objects and their empirical representation to the rest of the class, and it’s clearly not the guy writing the syllabus. Good thing you did the readings for today. Twice. It's easy to get your readings done when no one ever wants to be around you.";
                break;
            case "IHP":
                story += "You live and die (at least socially) by “rigorous inquiry.” Nothing gets past you. Whether you’re in HUM, SOSC, or the dining hall, you never fail to imperiously snark, “define your terms!” at unsuspecting “opponents” when your arguments inevitably lead you into trouble. You’re the guy who’s up debating free will at 4 am because you couldn’t let that shy, quiet kid in your SOSC class get away with assuming the incompatibility of Newtonian determinism and Sartrean freedom. Nice save!";
                break;
            case "IHA":
                story += "Congratulations! You’re the flagship That Kid. Your peers roll their eyes whenever you speak and your professor is tired of your bullshit. But what do they know? They didn’t read the collected works of Hegel in German. They all know you did, though, because you’ve mentioned your summer reading list in class 18 times. You’re a natural-born leader, and you embody the gifts of charisma and confidence. You’re such a leader that your own professor is intimidated by you. That’s probably why he left that snarky comment on your transcript.";
                break;
            case "INP":
                story += "Lots of the material in the core is difficult and thorny. Good thing there is a highly qualified individual in the room prepared to lead these bewildered undergrads to understanding. You! Your role is to bring outside sources, brilliant insights, and a benevolent pretentiousness to the class discussion. The professor is there to answer questions and guide conversation, but only if you don’t get there first. Your leadership and insight are likely to move the discussion to a higher plane and to move you to the farthest corner at house parties.";
                break;
            case "INF":
                story += "Barack Obama once said that “to become God is the loneliest achievement of them all.” Think about that while you’re deifying your already lonely and clinically depressed Math 151 graduate lecturer. You don’t walk from class to class, rather you migrate from temple to temple, worshipping at the altars of those who inhabit the mystical plane of Ph.D. Like some sort of amoeba, you hungrily engulf without question everything these exalted Professors say. While you’re basking in the light of the these all knowing divinities, make sure not to be too obsequious lest your classmates get their eyes stuck in the backs of their heads. You’re pretty pathetic, but at least your prof likes it when you bring their exact starbucks order to office hours.";
                break;
            case "INA":
                story += "Socrates’ peers forced him to drink a cup of poison hemlock. He fucking deserved it. You merit a similar fate. From the moment you glimpsed the forms in the first week of HUM, you have insufferably dragged your compatriots toward enlightenment against their wills. You have all of the answers, you fear not the great questions of existence, and you sleep easily at night, knowing your place in the universe. It’s also probably why you’re the only one in your bed.";
                break;
            case "UHF":
                story += "First of all, you suck. It’s likely that you are not just a that kid, but that you are also a thoroughly pernicious individual. Nobody enjoys your smirks, scoffs, and guffaws when the professor writes h instead of ħ. You should have listened to your mother when she said “If you don’t have anything nice to say, don’t say anything.” Since you didn't, we’ll say it to you again: If you don't have anything nice to say, don't say anything or your professor will dock you participation grade and your classmates will rise as one and slay you.";
                break;
            case "UHP":
                story += "You didn't do the readings, but one of your peers said something stupid. You are saved. This idiot said just enough to clue your hungover mind onto what exactly should be said. All you have to do now is utter the magic phrase: “I’d just like to push back against that.” Participation grade saved. Now you can go back to pretentiously scribbling delta epsilon proofs with large handwriting so that your peers can see that you are A.) Very Very Smart, and B.) too cool for SOSC.";
                break;
            case "UHA":
                story += "Gambling addicts believe their next big win is just around the corner. You are pretty much the same. You’re going to get that next question right, and you’ll finally be able to tangentially relate your knowledge of greek mythology from the Percy Jackson Series to the Euthyphro dilemma. However, just like the gambler, you are wrong. But that won’t stop you from trying again and again until your dignity is spent. If your peers are wincing, it’s not because it’s a bright Thursday morning and bar night was lit. It's because your dumbass comments elicit a physical pain response.";
                break;
            case "UNA":
                story += "You did the reading and have a lot of thoughts. Scratch that, a fuck ton of thoughts. Actually, more like a large agglomeration of notional fancies. You may almost have mastered the art of thinking out loud but you aren't quite Ed Sheeran and so you should probably stop which is not to say that all speech is bad of course but it is important to note that we don't think you will have any chance of getting laid if you don't stop talking which is not to say that your mountains of fluff don't contain any diamonds in the rough but what we mean to say is SHUT THE FUCK UP!";
                break;
            case "UNF":
                story += "You never got your parents approval, so now you try desperately to win your professor’s. Surely raising your hand all the time, nodding like a bobblehead on a backroad, and hogging their office hours will win them over! You come prepared for class with every text on the syllabus compressing your spine, polychrome notes that would make a pantone rep jealous and an insufferable willingness to learn and participate. You are like an F-22 raptor. A lean mean academic machine. You’re prepared to blast your professor’s socks off. Only instead of an F-22, you’re more like a drone running on Windows 2000. You are an object of awe, pity and schadenfreude as the professor smiles politely and says “Mm-hmm, anyone else?” Too bad life rewards results rather than effort.";
                break;
        }
        story  += "</font>";
        var tki_desc = "</br></br><font size=2>*That Kid Index (from 0 to 1)"
        if (tkness_percent < .5){
            document.getElementById("result").innerHTML = "You are <b>not</b> a That Kid!\
                TKI: "+(Math.round(100 * tkness_percent))/100. + 
                "*</br> But if you were, your TK type would be...</br></br>\
                <font size=8><b>"+ tktype+": "+names[tktype] + "</b></font></br>"
                +description + story +tki_desc;
        }
        else {
            document.getElementById("result").innerHTML = "You are a That Kid!\
                TKI: "+(Math.round(100 * tkness_percent))/100. + "*</br>\
                Your TK type is...</br><font size=8><b>" + tktype+": "+names[tktype] + "</b></font></br>"+description+ story + tki_desc;
        }
        document.getElementById("intro1").innerHTML = "";

        document.getElementById("intro2_div").style.display = "none";
        document.getElementById('portfolio').scrollIntoView(true);

        var sendData = document.getElementById("sendData");
        sendData.style.display = "inline-block";
        document.getElementById("entry.1165881888").value = ID + " " + tktype + " " + results_string + " TK: " + tkness_percent + 
            " intel: " + intelligence_percent + " hostility: "+hostility_percent 
            + " peer: " + peer_percent + " faculty: "+faculty_percent;
        document.getElementById("submitData").click(); 
        sendData.style.display = "none";   
        completed = true;
        
    });

$("#surveyElement2").Survey({model:model2});

function continueFunc2() {
    document.getElementById("surveyElement2").style.display = "inline-block";
    document.getElementById("intro2_div").style.display = "none";
}

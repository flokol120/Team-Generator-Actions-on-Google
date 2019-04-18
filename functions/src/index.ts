/**
 *
 * @author Flo Dörr
 * @date 2019-04-18
 */
import { https } from 'firebase-functions';
import { dialogflow, SimpleResponse, RichResponse, Table, DialogflowConversation, Contexts } from 'actions-on-google';
import { GET_COUNT, SHUFFLE, CHANGE_COUNT, ADD_NAMES, REMOVE_NAMES } from './intents';
import { getPreText, getWizardText, getSendTeamsPreText, getTeamAssignmentText, getAnd, getTeamSuggestions } from './responses';

const app = dialogflow();

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const handleTeamGenerator = (conv: DialogflowConversation<{}, {}, Contexts>, args: any) => {
    let count = args.number as number

    const locale = conv.user.locale;
    const preText = getPreText(count, locale)

    conv.add(new SimpleResponse({
        text: preText,
        speech: preText,
    }));

    const namesList = args.names as Array<string>;
    const namesToAddList = args.namesToAdd as Array<string>;
    if (namesToAddList !== undefined) {
        for (const name of namesToAddList) {
            namesList.push(name);
        }
    }
    conv.parameters.names = namesList;
    conv.contexts.set('getcount-followup ', 5, {
        names: namesList,
        number: count,
    });

    let userPerTeam = namesList.length / (args.number as number);
    let isEven;

    if (count > namesList.length) {
        const error = getWizardText(namesList.length, count, locale);
        conv.add(new RichResponse({
            items: [
                new SimpleResponse({
                    text: error[0],
                    speech: error[0],
                }),
            ],
            suggestions: error[1],
        }));
    } else {

        if (userPerTeam < 1) {
            userPerTeam = 1;
            count = namesList.length;
        }

        if (namesList.length % count !== 0) {
            isEven = false;
            userPerTeam = Math.floor(userPerTeam);
        } else {
            isEven = true;
        }

        shuffleArray(namesList);

        const columnList = Array<string>();
        const rowsList = Array<Array<string>>();
        for (let i = 0; i < count; i++) {
            columnList.push(`Team ${i + 1}`)
        }

        let counter = 0;
        let teamCounter = 0;
        const teams = new Array<Array<string>>()
        let team = new Array<string>();
        rowsList.push([]);

        for (const name of namesList) {
            if (counter >= count) {
                teamCounter++;
                teams.push(team)
                rowsList.push([]);
                counter = 0;
                team = new Array<string>();
            }
            rowsList[teamCounter].push(name);
            team.push(name);
            counter++;
        }

        let rowLength;
        for (let i = 0; i < rowsList.length; i++) {
            if (i === 0) {
                rowLength = rowsList[i].length
            } else {
                if (rowsList[i].length !== rowLength) {
                    rowsList[i].push('');
                    i--;
                }
            }
        }

        let responseText;
        let responeSpeech;
        const table = new Table({
            dividers: true,
            columns: columnList,
            rows: rowsList,
        })
        table.rows[0];
        if (!isEven) {
            userPerTeam += 1;
        }

        const teamsSort = [[]];
        for (let i = 0; i < count; i++) {
            teamsSort.push([])
            for (let j = 0; j < userPerTeam; j++) {
                if (table.rows[j].cells[i].text !== undefined && table.rows[j].cells[i].text !== null && table.rows[j].cells[i].text !== '') {
                    teamsSort[i][j] = table.rows[j].cells[i].text;
                }
            }
        }
        responseText = getSendTeamsPreText(locale);
        responeSpeech = responseText;

        for (let i = 0; i < teamsSort.length; i++) {
            if (teamsSort[i] !== null && teamsSort[i] !== null && teamsSort[i] !== [] && teamsSort[i].length !== 0) {
                responeSpeech += getTeamAssignmentText(i, teamsSort[i].length, locale);
            }
            for (let j = 0; j < teamsSort[i].length; j++) {
                if (j === teamsSort[i].length - 2) {
                    responeSpeech += teamsSort[i][j] + getAnd(locale);
                } else if (j === teamsSort[i].length - 1) {
                    responeSpeech += teamsSort[i][j] + '.\n';
                } else {
                    responeSpeech += teamsSort[i][j] + ', ';
                }
            }
        }

        const suggestions = getTeamSuggestions(locale);
        if (count < 7) {
            conv.add(new RichResponse({
                items: [new SimpleResponse({
                    text: responeSpeech,
                    speech: responeSpeech,
                }), new Table({
                    dividers: true,
                    columns: columnList,
                    rows: rowsList,
                })],
                suggestions: suggestions,
            }));
        } else {
            conv.add(new RichResponse({
                items: [new SimpleResponse({
                    text: responeSpeech,
                    speech: responeSpeech,
                })],
                suggestions: suggestions,
            }));
        }
    }
};

app.intent(GET_COUNT, (conv, { number, names }) => handleTeamGenerator(conv, { number, names }));

app.intent(SHUFFLE, (conv, { number, names }) => handleTeamGenerator(conv, { number, names }));

app.intent(CHANGE_COUNT, (conv, { number, names }) => handleTeamGenerator(conv, { number, names }));

app.intent(ADD_NAMES, (conv, { number, names, namesToAdd }) => handleTeamGenerator(conv, { number, names, namesToAdd }));

app.intent(REMOVE_NAMES, (conv, { number, names, namesToRemove }) => {
    const namesList = (names as Array<string>).filter((el) => {
        return (namesToRemove as Array<string>).indexOf(el) < 0;
    });
    handleTeamGenerator(conv, { number, names: namesList });
});

// Export the Cloud Functions
export const fulfillment = https.onRequest(app);
/**
 *
 * @author Flo Dörr
 * @date 2019-04-18
 */
export const getPreText = (number: number, locale: string): string => {
    const lang = locale.split('-')[0];
    switch (lang) {
        case 'de': {
            return `Also gut, ${number} Teams! Lass mich überlegen...`;
        }
        default: {
            return `Alright, ${number} teams! Let me think of a good arrangement...`;
        }
    }
};

export const getWizardText = (length: number, count: number, locale: string): any[] => {
    const lang = locale.split('-')[0];
    switch (lang) {
        case 'de': {
            return [`Oh. Ich bin leider kein Zauberer und kann nicht ${length} Personen auf ${count} Teams aufteilen.`, ['ändere Anzahl der Teams']];
        }
        default: {
            return [`Oh sorry, I am not a magician. I cannot divide ${length} people into ${count} teams.`, ['change number of teams']];
        }
    }
};

export const getSendTeamsPreText = (locale: string): string => {
    const lang = locale.split('-')[0];
    switch (lang) {
        case 'de': {
            return 'Hier sind Deine Teams:\n';
        }
        default: {
            return 'Here are your teams:\n';
        }
    }
};

export const getTeamAssignmentText = (teamNumber: number, teamSize: number, locale: string): string => {
    const lang = locale.split('-')[0];
    switch (lang) {
        case 'de': {
            if (teamSize > 1) {
                return `In Team Nummer ${teamNumber + 1} sind: `;
            } else {
                return `In Team Nummer ${teamNumber + 1} ist: `;
            }
        }
        default: {
            if (teamSize > 1) {
                return `In team number ${teamNumber + 1} are: `;
            } else {
                return `In team number ${teamNumber + 1} is: `;
            }
        }
    }
};

export const getAnd = (locale: string): string => {
    const lang = locale.split('-')[0];
    switch (lang) {
        case 'de': {
            return ' und ';
        }
        default: {
            return ' and ';
        }
    }
};

export const getTeamSuggestions = (locale: string): string[] => {
    const lang = locale.split('-')[0];
    switch (lang) {
        case 'de': {
            return ['mische die Teams', 'ändere Anzahl der Teams', 'Personen hinzufügen', 'Personen entfernen', 'generiere ein neues Team', 'schließen'];
        }
        default: {
            return ['shuffle the teams', 'change number of teams', 'add names', 'remove names', 'generate a new team', 'close'];
        }
    }
};
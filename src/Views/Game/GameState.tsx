import { TeamState } from "./TeamState";
import { isUuid, uuid } from "uuidv4";

export interface GameState {
    currentTeam: string,
    teamsReady: boolean;
    trapsReady: boolean;
    playerReady: boolean;
    teams: {
        [key: string]: TeamState
    };
}

export class GameState {
    static trapsRequired = [0, 3, 4, 5, 6, 7];

    static init(): GameState {
        const teamId = this.getTeamId();
        return {
            currentTeam: teamId,
            teamsReady: false,
            trapsReady: false,
            playerReady: false,
            teams: {
                [teamId]: this.initTeam()
            },
        };
    }

    static getTeamId() {
        const teamId = localStorage.getItem("teamId");
        if (teamId !== null && isUuid(teamId)) return teamId;
        const newTeamId = uuid();
        localStorage.setItem('teamId', newTeamId);
        return newTeamId;
    }

    static getNextWord(): string {
        const words = ['Wampir', 'Piłkarz', 'Murarz', 'Namiot', 'Kostka', 'Sygnał'];
        return words[Math.floor(Math.random() * words.length)];
    }

    static getOpponentTeam(gameState: GameState): TeamState {
        const opponentsTeams: TeamState[] = Object.entries<TeamState>(gameState.teams || {}).filter(key => key[0] !== this.getTeamId()).map(entry => entry[1]);
        if (opponentsTeams.length) {
            return opponentsTeams[0];
        }
        throw new Error("opponent not found!");
    }

    static containsTeam(gameState: GameState) {
        return Object.keys(gameState.teams).includes(this.getTeamId());
    }

    static getSetTrapsCount(gameState: GameState) {
        return Object.values<TeamState>(gameState.teams || {})
            .map(team => team.traps || [])
            .map(traps => traps.length)
            .reduce((a: number, b: number) => a + b);
    }

    static getRequiredTrapsCount(gameState: GameState) {
        return Object.values<TeamState>(gameState.teams || {})
            .map(team => team.level)
            .reduce((a, b) => this.trapsRequired[a] + this.trapsRequired[b])
    }

    static initTeam(): TeamState {
        return {
            level: 1,
            traps: [],
            word: this.getNextWord()
        };
    }
}


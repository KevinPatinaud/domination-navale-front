import { Component, EventEmitter, Output } from "@angular/core";
import { GameMode } from "../../locales/gameMode";
import { GameService } from "../../services/game/game.service";

@Component({
  selector: "game-mode",
  templateUrl: "./gameMode.component.html",
  styleUrls: ["./gameMode.component.css"],
})
export class GameModeComponent {
  @Output() onGameModeChoosed = new EventEmitter<GameMode>();
  GameMode = GameMode;

  displaySoloOrMultiBtn = true;
  displayMultiplayerOptionBox = false;

  constructor(private gameService: GameService) {}

  choseModeSolo() {
    this.gameService
      .generateNewGame(GameMode.SOLO)
      .subscribe((idOpponent: string) =>
        this.onGameModeChoosed.emit(GameMode.SOLO),
      );
  }

  choseModeMultiPlayer() {
    this.displaySoloOrMultiBtn = false;
    this.displayMultiplayerOptionBox = true;
  }

  closeMultiPlayerBox() {
    this.displaySoloOrMultiBtn = true;
    this.displayMultiplayerOptionBox = false;
  }

  allPlayerReady(idGame: string) {
    console.log("partie multi : " + idGame);
    this.onGameModeChoosed.emit(GameMode.MULTI);
  }
}

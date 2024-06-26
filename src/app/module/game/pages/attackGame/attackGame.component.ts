import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { StatusEndGame } from "../../locales/statusEndGame";
import Boat from "../../models/boat";
import { GameService } from "../../services/game/game.service";
@Component({
  selector: "game-attack-game",
  templateUrl: "./attackGame.component.html",
  styleUrls: ["./attackGame.component.css"],
})
export class AttackGameComponent {
  @Input() myBoats: Boat[] | undefined;
  @Output() onGameFinishedEvent = new EventEmitter<StatusEndGame>();
  subscription: Subscription;

  constructor(private gameService: GameService) {
    this.subscription = this.gameService.endGameEvent.subscribe(
      (statusEndGame: StatusEndGame) => {
        console.log(statusEndGame);
        this.onGameFinishedEvent.emit(statusEndGame);
      },
    );
  }
}

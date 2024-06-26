import { Component, EventEmitter, Output } from "@angular/core";
import Boat from "../../models/boat";
import { BoatDescription } from "../../models/boatDescription";
import { GameService } from "../../services/game/game.service";
import { GameMode } from "../../locales/gameMode";

@Component({
  selector: "game-placement",
  templateUrl: "./placement.component.html",
  styleUrls: ["./placement.component.css"],
})
export class PlacementComponent {
  @Output() onAllBoatAreDisposeEvent = new EventEmitter<Boat[]>();

  selectedBoat = undefined as unknown as BoatDescription;
  onGridBoats = [] as Boat[];
  isLastBoatSelected = false;
  isAllBoatsArePositionned = false;
  isOpponentHavePositionHisBoat = false;
  isWaitingForOpponentPositionHisBoat = false;
  isMouseOverTheGrid = false;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    const that = this;
    this.gameService.opponentPositionBoatDoneEvent.subscribe(() => {
      that.isOpponentHavePositionHisBoat = true;
      if (that.isAllBoatsArePositionned) {
        that.onAllBoatAreDisposeEvent.emit(that.onGridBoats);
      }
    });
  }

  onBoatSelected(boat: BoatDescription) {
    this.selectedBoat = boat;
    console.log(this.selectedBoat);
  }

  mouseEnterInTheGrid() {
    console.log("mouse enter in the grid");
    this.isMouseOverTheGrid = true;
  }

  mouseExitTheGrid() {
    console.log("mouse exit the grid");
    this.isMouseOverTheGrid = false;
  }

  onGridUpdate(onGridBoats: Boat[]) {
    this.onGridBoats = onGridBoats;
    this.selectedBoat = undefined as unknown as BoatDescription;

    // when we dispose the last boat
    if (this.isLastBoatSelected) {
      this.gameService.submitBoatsPositions(this.onGridBoats);
      this.isAllBoatsArePositionned = true;

      // if the opponent hade already dispose  all his boats when send the event
      if (
        this.isOpponentHavePositionHisBoat ||
        this.gameService.gameMode === GameMode.SOLO
      ) {
        this.onAllBoatAreDisposeEvent.emit(this.onGridBoats);
      }
      // if the opponent haven't already dispose his boats we indicate that we are waiting
      else {
        this.isWaitingForOpponentPositionHisBoat = true;
      }
    }
  }

  onLastBoatSelected() {
    this.isLastBoatSelected = true;
  }
}

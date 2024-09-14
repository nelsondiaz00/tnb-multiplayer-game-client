import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-alert",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./alert.component.html",
    styleUrls: ["./alert.component.css"],
})
export class AlertComponent {
    private _show: boolean = false;

    @Input() message: string = "Error";

    @Input()
    set show(value: boolean) {
        this._show = value;
        if (value) {
            setTimeout(() => {
                this._show = false;
            }, 3000);
        }
    }

    get show(): boolean {
        return this._show;
    }

    hideAlert() {
        this._show = false;
    }
}

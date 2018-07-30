import { Component, OnInit } from "@angular/core";
import * as pushPlugin from "nativescript-push-notifications";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    private pushSettings = {
        senderID: "112820180309", // Required: setting with the sender/project number
        notificationCallbackAndroid: (stringifiedData: String, fcmNotification: any) => {
            const notificationBody = fcmNotification && fcmNotification.getBody();
            alert("Message received!\n" + notificationBody + "\n" + stringifiedData);
        }
    };

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        pushPlugin.register(this.pushSettings, (token: String) => {
            alert("Device registered. Access token: " + token);
            console.log(token);
        }, function() { });

        this.items = this.itemService.getItems();
    }

    private updateMessage(text: String) {
        console.log(text);
    }
}
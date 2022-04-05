import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, Observable} from "rxjs";
import {Store} from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {LoggingService} from "../logging.service";



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private slService: ShoppingListService,
              private loggingService: LoggingService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    this.store.select('shoppingList').subscribe();
    /*this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );*/

    this.loggingService.printLog('Hello from ShoppingListComponent NgOnInit')
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

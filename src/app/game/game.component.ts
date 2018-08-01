import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  row: number;
  col: number;
  mines: number;
  grid_array: number[][] = [];
  mines_grid: number[][] = [];
  button_text: string[][] = [];
  button_disable: boolean[][] = [];
  first_click: boolean = true;

  constructor() {
    this.row = 8;
    this.col = 8;
    this.mines = 10;
  }

  ngOnInit() {
    this.createGrid();
    this.putMines();
    this.createTexts();
    this.setDisablity();
  }

  createTexts() {
    let arr: string[] = [];
    for (let j = 0; j < this.row; j++) {

      arr = [];
      for (let i = 0; i < this.col; i++) {
        arr.push("");
      }
      this.button_text.push(arr);
    }
  }

  setDisablity() {
    let arr: boolean[] = [];
    for (let j = 0; j < this.row; j++) {

      arr = [];
      for (let i = 0; i < this.col; i++) {
        arr.push(false);
      }
      this.button_disable.push(arr);
    }
  }

  createGrid() {
    let arr: number[] = [];
    for (let j = 0; j < this.row; j++) {

      arr = [];
      for (let i = 0; i < this.col; i++) {
        arr.push(0);
      }
      this.grid_array.push(arr);
    }
  }

  putMines() {
    let i_pos: number;
    let j_pos: number;
    let mines_count: number;
    for (mines_count = 0; mines_count < this.mines; mines_count++) {
      i_pos = Math.floor(Math.random() * (7));
      j_pos = Math.floor(Math.random() * (7));
      if (this.grid_array[i_pos][j_pos] == 0) {
        this.grid_array[i_pos][j_pos] = -1;
        this.mines_grid[mines_count] = [];
        this.mines_grid[mines_count][0] = i_pos;
        this.mines_grid[mines_count][1] = j_pos;
      }
      else {
        mines_count--;
      }
    }
  }

  showZeroVals(row: number, col: number) {
    if (row - 1 >= 0) {
      this.foo(row - 1, col);
    }
    if ((row - 1 >= 0) && (col + 1 < this.col)) {
      this.foo(row - 1, col + 1);
    }
    if (col + 1 < this.col) {
      this.foo(row, col + 1);
    }
    if ((row + 1 < this.row) && (col + 1 < this.col)) {
      this.foo(row + 1, col + 1);
    }
    if (row + 1 < this.row) {
      this.foo(row + 1, col);
    }
    if ((row + 1 < this.row) && (col - 1 >= 0)) {
      this.foo(row + 1, col - 1);
    }
    if (col - 1 >= 0) {
      this.foo(row, col - 1);
    }
    if ((row - 1 >= 0) && (col - 1 >= 0)) {
      this.foo(row - 1, col - 1);
    }
  }

  foo(row: number, col: number) {
    if(this.button_disable[row][col]==true){
      return;
    }
    let count: number = this.getVal(row, col);

    if (count != 0) {
      this.button_text[row][col] = count.toString();
      this.button_disable[row][col] = true;
      return;
    }
    else {
      this.button_disable[row][col] = true;
      this.showZeroVals(row, col);
      return;
    }
  }

  getVal(r: number, c: number): number {
    console.log(r + " " + c);
    this.button_disable[r][c] = true;
    if (this.grid_array[r][c] == -1) {
      alert("bomb clicked!!!");
      return -1;
    }
    else {
      let count = 0;
      if ((r - 1 >= 0) && (c - 1 >= 0)) {
        if (this.grid_array[r - 1][c - 1] == -1) { count = count + 1; }
      }
      if ((r - 1 >= 0) && (c + 1 < this.col)) {
        if (this.grid_array[r - 1][c + 1] == -1) { count = count + 1; }
      }
      if ((r - 1 >= 0)) {
        if (this.grid_array[r - 1][c] == -1) { count = count + 1; }
      }
      if ((r + 1 < this.row) && (c - 1 >= 0)) {
        if (this.grid_array[r + 1][c - 1] == -1) { count = count + 1; }
      }
      if ((r + 1 < this.row) && (c + 1 < this.col)) {
        if (this.grid_array[r + 1][c + 1] == -1) { count = count + 1; }
      }
      if ((r + 1 < this.row)) {
        if (this.grid_array[r + 1][c] == -1) { count = count + 1; }
      }
      if ((c - 1 >= 0)) {
        if (this.grid_array[r][c - 1] == -1) { count = count + 1; }
      }
      if ((c + 1 < this.col)) {
        if (this.grid_array[r][c + 1] == -1) { count = count + 1; }
      }
      console.log(count);
      return count;
    }
  }

  showVal(r: number, c: number) {
    let count: number = this.getVal(r, c);
    if (count != 0 && count!=-1) {
      this.button_text[r][c] = count.toString();
    }
    else if(count==0){
      this.showZeroVals(r, c);
    }
  }

  getExp(r:number,c:number){
    return this.button_disable[r][c];
  }

}

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  v: number;
  timer;
  time: number;
  div_type: number;
  row: number = 8;
  col: number = 9;
  mines: number = 10;
  grid_array: number[][] = [];
  mines_grid: number[][] = [];
  button_text: string[][] = [];
  button_disable: boolean[][] = [];
  button_clicked: boolean[][] = [];
  button_dbl_click: boolean[][] = [];
  first_click: boolean = true;
  button_clicked_count: number;
  final_msg:string;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(
      res => {
        this.v = res.id;
        this.setVals();
      }
    )
  }

  setVals() {
    if (this.v == 1) {
      this.row = 8;
      this.col = 8;
      this.mines = 10;
      this.div_type = 1;
    }
    else if (this.v == 2) {
      this.row = 16;
      this.col = 16;
      this.mines = 40;
      this.div_type = 2;
    }
    else if (this.v == 3) {
      this.row = 16;
      this.col = 32;
      this.mines = 99;
      this.div_type = 3;
    }
    this.time = 0;
    this.button_clicked = [];
    this.button_disable = [];
    this.grid_array = [];
    this.button_text = [];
    this.mines_grid = [];
    this.button_dbl_click = [];
    this.first_click = true;
    this.button_clicked_count = 0;
    this.final_msg="";
    this.createGrid();
    this.putMines();
    this.createTexts();
    this.setDisablity();
    clearInterval(this.timer);
  }

  ngOnInit() {

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
    for (let j = 0; j < this.row; j++) {

      arr = [];
      for (let i = 0; i < this.col; i++) {
        arr.push(false);
      }
      this.button_clicked.push(arr);
    }
    for (let j = 0; j < this.row; j++) {

      arr = [];
      for (let i = 0; i < this.col; i++) {
        arr.push(false);
      }
      this.button_dbl_click.push(arr);
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
      i_pos = Math.floor(Math.random() * (this.row - 1));
      j_pos = Math.floor(Math.random() * (this.col - 1));
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
    if ((this.button_disable[row][col] == true) || (this.button_dbl_click[row][col] == true)){
      return;
    }
    let count: number = this.getVal(row, col);
    this.button_clicked_count = this.button_clicked_count + 1;
    if (count != 0) {
      this.button_text[row][col] = count.toString();
      this.button_dbl_click[row][col] = false;
      this.button_disable[row][col] = true;
      this.button_clicked[row][col] = true;
      return;
    }
    else {
      this.button_disable[row][col] = true;
      this.button_dbl_click[row][col] = false;
      this.button_clicked[row][col] = true;
      this.showZeroVals(row, col);
      return;
    }
  }

  getVal(r: number, c: number): number {
    this.button_disable[r][c] = true;
    this.button_clicked[r][c] = true;
    if (this.grid_array[r][c] == -1) {
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
      return count;
    }
  }

  showVal(r: number, c: number) {
    if (this.first_click == true) {
      this.firstClickAction(r, c);
    }
    this.button_dbl_click[r][c] = false;
    let count: number = this.getVal(r, c);
    if (count != 0 && count != -1) {
      this.button_text[r][c] = count.toString();
    }
    else if (count == 0) {
      this.showZeroVals(r, c);
    }
    else {
      this.gameOver();
     this.final_msg="Game Lost. Time taken is : " + this.time +" seconds";

    }
    this.button_clicked_count = this.button_clicked_count + 1;
    if (this.button_clicked_count == (this.row * this.col - this.mines)) {
      this.gameOver();
     this.final_msg="Game Won!!! Time taken is : " + this.time +" seconds";

    }
  }

  firstClickAction(r: number, c: number) {
    while (this.grid_array[r][c] == -1) {
      this.grid_array = [];
      this.mines_grid = [];
      this.createGrid();
      this.putMines();
    }
    this.startTimer();
    this.first_click = false;
  }

  gameOver() {
    clearInterval(this.timer);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        this.button_disable[i][j] = true;
        this.button_dbl_click[i][j] = false;
      }
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.time = this.time + 1;
    }, 1000);
  }

  doubleClicked(r: number, c: number) {
    this.button_dbl_click[r][c] = !this.button_dbl_click[r][c];
    return false;
  }

}

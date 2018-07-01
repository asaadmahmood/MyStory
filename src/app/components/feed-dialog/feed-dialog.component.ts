import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'ms-feed-dialog',
  templateUrl: './feed-dialog.component.html',
  styleUrls: ['./feed-dialog.component.scss']
})
export class FeedDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<FeedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }

}

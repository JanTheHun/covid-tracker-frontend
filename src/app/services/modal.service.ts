import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  errorConfig: MatDialogConfig = {
    disableClose: true
  }

  constructor(
    public messageDialog: MatDialog,
    public errorDialog: MatDialog
  ) { }

  openErrorDialog(errorMessage: string) {
    const newErrorCfg = Object.assign({}, this.errorConfig)
    newErrorCfg.data = errorMessage
    const dialogRef = this.errorDialog.open(ErrorDialogComponent, newErrorCfg)

  }
}

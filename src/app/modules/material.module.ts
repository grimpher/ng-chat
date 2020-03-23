import { NgModule } from '@angular/core';

import {
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule
  } from '@angular/material';

@NgModule({
    exports: [  
        MatListModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatInputModule,
        MatIconModule
    ]
})
export class MaterialModule {}
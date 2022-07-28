import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private subscriptions = new Subscription();
  @ViewChild('action') action: any;
  title = 'msc-scan';
  public output: string | undefined;
  showCamera = false;

  constructor(private http: HttpClient) {}

  // @ViewChild('action', { static: true }) action: NgxScannerQrcodeComponent;
  // TODO something this.action

  public onError(e: any): void {
    alert(e);
  }
  send(body: any): void {
    console.log(body);
    if (body !== null){
      console.log('here')
      this.action.toggleCamera();
    }
    this.subscriptions.add(
      this.http.get<any>(body).subscribe(
        res => {
          console.log(res);
          this.http.post<any>('https://test.armonbakhtar.repl.co/api/qr', {caseId: res.data.id, caseNumber: res.data.caseNumber, caption: res.data.style}).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err)
        }
      )
        },
        err => {
          console.log(err)
        }
      )
      
    );
  }
}

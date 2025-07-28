import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Parameter {
  id?: number;
  wert: string;
  funktion: 'QS' | 'ENTW' | 'ITSUP';
  anzahl: number;
}

@Component({
  standalone: true,
  selector: 'app-parameter',
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: \`
    <h1 class="text-xl font-bold">Parameter Verwaltung</h1>
    <form (ngSubmit)="save()" class="space-y-2">
      <input [(ngModel)]="form.wert" name="wert" placeholder="Wert" maxlength="10" required>
      <select [(ngModel)]="form.funktion" name="funktion">
        <option value="QS">QS</option>
        <option value="ENTW">ENTW</option>
        <option value="ITSUP">ITSUP</option>
      </select>
      <input type="number" [(ngModel)]="form.anzahl" name="anzahl" max="99999" required>
      <button type="submit">Speichern</button>
    </form>

    <ul>
      <li *ngFor="let p of parameter">
        {{p.wert}} - {{p.funktion}} - {{p.anzahl}}
        <button (click)="remove(p.id!)">Löschen</button>
      </li>
    </ul>
  \`
})
export class ParameterComponent {
  private http = inject(HttpClient);
  parameter: Parameter[] = [];
  form: Parameter = { wert: '', funktion: 'QS', anzahl: 0 };

  constructor() {
    this.load();
  }

  load() {
    this.http.get<Parameter[]>('http://localhost:8080/api/parameter').subscribe(data => this.parameter = data);
  }

  save() {
    this.http.post<Parameter>('http://localhost:8080/api/parameter', this.form).subscribe(() => {
      this.form = { wert: '', funktion: 'QS', anzahl: 0 };
      this.load();
    });
  }

  remove(id: number) {
    this.http.delete('http://localhost:8080/api/parameter/' + id).subscribe(() => this.load());
  }
}

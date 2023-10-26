import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamBlocksComponent } from './exam-blocks/exam-blocks.component';
import { StudentDataComponent } from './student-data/student-data.component';
// import { AbsentReportComponent } from './absent-report/absent-report.component';
import { AbsentReportHomeComponent } from './absent-report-home/absent-report-home.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ClassComponent } from './class/class.component';
import { HistoryAbsentComponent } from './history-absent/history-absent.component';
import { HistoryMalpracticeComponent } from './history-malpractice/history-malpractice.component';
import { ReportAbsentComponent } from './report-absent/report-absent.component';
import { ReportMalpracticeComponent } from './report-malpractice/report-malpractice.component';
import { ValidationReportComponent } from './validation-report/validation-report.component';
import { DemoComponent } from './demo/demo.component';
import { ShowChartComponent } from './show-chart/show-chart.component';
import { NextpageComponent } from './nextpage/nextpage.component';
import { UpdationsComponent } from './updations/updations.component';
import { SignupComponent } from './signup/signup.component';
import { DeleteteacherComponent } from './deleteteacher/deleteteacher.component';
import { ViewhistoryComponent } from './viewhistory/viewhistory.component';
const routes: Routes = [
  {path: '',redirectTo: 'absent-report-home',pathMatch: 'full'},
  {path: 'absent-report-home',component: AbsentReportHomeComponent},

  { path: 'students', component: StudentDataComponent },
  { path: 'exam-blocks', component: ExamBlocksComponent },
  { path: 'view-report/:classId', component: ViewReportComponent },
  {path:'class',component:ClassComponent},
  {path:'history-absent',component:HistoryAbsentComponent},
  { path: 'report-absent/:classId', component: ReportAbsentComponent },
  {path:'history-malpractice',component:HistoryMalpracticeComponent},
  {path:'report-absent',component:ReportAbsentComponent},
  {path:'report-malpractice',component:ReportMalpracticeComponent},
  {path:'demo',component:DemoComponent},
  {path:'view-report',component:ViewReportComponent},
  {path:'validation-report',component:ValidationReportComponent},
  {path:'show-chart',component:ShowChartComponent},
  {path:'nextpage',component:NextpageComponent},
  {path:'updations',component:UpdationsComponent},
  {path:'signup',component:SignupComponent},
  {path:'deleteteacher',component:DeleteteacherComponent},
  {path:'viewhistory',component:ViewhistoryComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

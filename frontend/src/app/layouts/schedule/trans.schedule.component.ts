import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { PopupOpenEventArgs, EJ2Instance, ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, View } from '@syncfusion/ej2-angular-schedule';
import { HttpClient } from '@angular/common/http';
import { ScheduleEventData } from '../../model/ScheduleEventData';
import { ScheduleService } from '../../services/schedule.service';
import { Router } from '@angular/router';
import { TranslatorService } from "../../services/translator-service.service";


@Component({
  selector: 'app-schedule',
  providers: [DayService, WeekService, WorkWeekService, MonthService],
  templateUrl: './trans.schedule.component.html',
  styleUrls: ['./trans.schedule.component.css']
})
export class TransscheduleComponent {


  type: string = '';
  isOnSite: boolean = false;

  search = {
    endTime: Date(),
    startTime: Date(),
    selectedLocation: ''
  }

  onRadioChange() {
    if (this.type === 'onsite') {
      this.isOnSite = true;
    } else {
      this.isOnSite = false;
    }
  }

  onSubmit() {
    this.translatorService.setSearch(this.search);
    this.router.navigate(['/translator-list']);
  }

  constructor(private scheduleService: ScheduleService,
              private http: HttpClient,
              private translatorService: TranslatorService,
              private router: Router) { }
  newAppointment = new ScheduleEventData();
  events: object[] = [];

  public showQuickInfoOnSelectionEnd: Boolean = true;
  // public showQuickInfo: Boolean = false;
  @ViewChild("scheduleObj")
  public scheduleObj?: ScheduleComponent;
  @ViewChild("addButton")
  public selectedDate: Date = new Date();
  public scheduleViews: View[] = ['Day', 'Week', 'WorkWeek', 'Month'];
  public eventSettings: EventSettingsModel = {
    dataSource: []
  }


  ngOnInit(): void {
    this.scheduleService.findAll().subscribe(data => {
      this.events = (data);

      // Initialize the Scheduler after updating the dataSource
      this.initScheduler();
      this.eventSettings.allowEditing = false
    });
  }

  initScheduler() {
    // Initialize the Scheduler settings here
    this.eventSettings = {
      dataSource: this.events,
      fields: {
        id: 'id',
        subject: { name: 'subject' },
        isAllDay: { name: 'allDay' },
        // location: { name: 'location'},
        // description: { name: 'description' },
        startTime: { name: 'startTime' },
        endTime: { name: 'endTime' },
        // startTimezone: { name: 'startTimezone' },
        // endTimezone: { name: 'endTimezone' },
        isBlock: 'isBlock'
      }
    }
  }


  //********************************************************************** */
  public OnPopupClose(args: any) {

    // Check if the action is "Save" (indicating the "Save" button is clicked)
    const action = args.event.srcElement.innerHTML;
    if (args.type == 'Editor' || args.type == 'QuickInfo' && action === 'Save') {
      // Access the data only when the "Save" button is clicked
      if (args.type == 'Editor') {
        this.search.endTime = args.data.endTime;
        this.search.startTime = args.data.startTime;

      } else {
        // Access the data only when the "Save" button is clicked
        // console.log(args.data);
        
        this.createEvent(args.data);
        this.search.endTime = args.data.endTime;
        this.search.startTime = args.data.startTime;


      }
    } else if (args.type == 'DeleteAlert' && action === 'Delete') {
      this.scheduleService.delete(args.data.id).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);

        }
      )

    }
  }

  public onButtonClick(): void {
    let data: object = {
      Id: 1,
      Subject: 'Vacation',
      StartTime: new Date(2018, 1, 13, 9, 0),
      EndTime: new Date(2018, 1, 13, 10, 0),
      IsAllDay: false,
      IsBlock: true
    };
    this.dataMpping(data);
    this.createEvent(this.newAppointment)
    this.scheduleObj?.addEvent(this.newAppointment);
    // this.addButton?.element.setAttribute('disabled', 'true');
  }

  createEvent(data: any) {
    this.scheduleService.create(data).subscribe(
      (response) => {
        console.log('Schedule event added successfully', response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  dataMpping(data: any) {
    this.newAppointment.id = data.Id;
    this.newAppointment.subject = data.Subject;
    this.newAppointment.startTime = data.StartTime;
    this.newAppointment.endTime = data.EndTime;
    this.newAppointment.isAllDay = data.Subject;
    this.newAppointment.startTimezone = data.StartTimezone;
    this.newAppointment.endTimezone = data.EndTimezone;
    this.newAppointment.recurrenceRule = data.RecurrenceRule;
    this.newAppointment.recurrenceID = data.RecurrenceID;
    this.newAppointment.recurrenceException = data.RecurrenceException;
    this.newAppointment.description = data.Description;
    this.newAppointment.location = data.Location;
    this.newAppointment.isBlock = data.IsBlock;
  }

}
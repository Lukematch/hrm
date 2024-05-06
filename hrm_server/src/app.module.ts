import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ELoginModule } from './e_login/e_login.module';
import { AuthModule } from './logical/auth/auth.module';
import { AuthService } from './logical/auth/auth.service';
import { EmployeeController } from './employee/employee.controller';
import { RLoginModule } from './r_login/r_login.module';
import { RootModule } from './root/root.module';
import { NoticeModule } from './notice/notice.module';
import { SectionModule } from './section/section.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeaveApplyModule } from './leave_apply/leave_apply.module';
import { TrainContentModule } from './train_content/train_content.module';
import { TrainingModule } from './training/training.module';
import { SalaryModule } from './salary/salary.module';
import { RelieveApplyModule } from './relieve_apply/relieve_apply.module';
import { DimissionApplyModule } from './dimission_apply/dimission_apply.module';
import { JobsModule } from './jobs/jobs.module';
import { FeedbackModule } from './feedback/feedback.module';
import { CommandModule } from './command/command.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '12345678',
      host: 'localhost',
      port: 3306,
      database: 'hrm_database',
      retryDelay: 500,
      retryAttempts: 10,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      // synchronize: true //将实体类属性同步到数据库
    }), EmployeeModule, ELoginModule, AuthModule, RLoginModule, RootModule, NoticeModule, SectionModule, AttendanceModule, LeaveApplyModule, TrainContentModule, TrainingModule, SalaryModule, RelieveApplyModule, DimissionApplyModule, JobsModule, FeedbackModule, CommandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

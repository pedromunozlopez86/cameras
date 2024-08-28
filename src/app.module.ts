import { Module } from '@nestjs/common';
import { CamerasModule } from './modules/cameras/cameras.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camera } from './modules/cameras/entities/camera.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { Event } from './modules/events/entities/event.entity';
import { CapturesModule } from './modules/captures/captures.module';
import { Capture } from './modules/captures/entities/capture.entity';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { CaptureRangeModule } from './modules/capture-range/capture-range.module';
import { CaptureRange } from './modules/capture-range/entities/capture-range.entity';
import { InputCameraModule } from './modules/input-camera/input-camera.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Camera, Event, Capture, User, CaptureRange],
        ssl: {
          ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUJTUz+weSK82TGddk7c87A6RtK9gwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYThiOGU5NGMtOGM1MS00ZmExLWJjMWQtNjcwODQ1ODJl
NjM0IFByb2plY3QgQ0EwHhcNMjQwNjAzMDI1NjU3WhcNMzQwNjAxMDI1NjU3WjA6
MTgwNgYDVQQDDC9hOGI4ZTk0Yy04YzUxLTRmYTEtYmMxZC02NzA4NDU4MmU2MzQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKXwZOF9
y3GPC/hopEKLjsDG67Jb3lYDtucsLnIGvkXf7Uefy+Dh7ODgdr8cz4TwC2bRZZj8
1WLRBhDrbX37NpNwV2Qd5hrdPW+5bFSqKXpKi/sofwBfkLTLucJV2f9R67nOYcnI
HNumcP6s+WDQZixiuHDrk6yRJjrulgbhJ7M2LJm9R+lOblkme1mQ/9gfP+J1C1Xl
BiNsfnv9uXPeppI5X7Y46WaXJBYK7vXvoD/d6LvtuLJyTh29SD03xKedItDtiAxY
eyRj230yt4nqqF9etuYCj/uiuQJZUzkxw6I39tjFi3qGDyfe7/z7HWVOSVhM3xNS
mSqFoMuHkbGKBoZiyqeBEsVtVUdqSn7a3/ZjDDzS/W5xPzc7lECIflhgF0qY5QvH
JeX9b1pHI60aXbJR1Rvjsf5+lUj2+X3Cmwlz0DliQXgH89rWNoRjoYE1ufiIq5F+
OB7ePNII/zD0ara/6wMZK70yMHPGv3axN03fhPKnBDV1Jd05rAhoq56/BwIDAQAB
oz8wPTAdBgNVHQ4EFgQUg1+a/rNXvzhvW4Oy5nJVSJMsGY0wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAGjkLWUeYt2rakWx
enxMdozKz8pTnSsPCISBPh2qvrJ4rMLueU1QBIeLCJgObY5R5BTcTOojo37IFJBO
LJQ8s8XwMq4u5it8KJbXCN7WaYwzwYPbRtqAcQr/Cg9t/VYaTcSKvY1Gosiwm58f
ZzGmF2+79cDsXaT3OIe5462rEppdyzbEUP3Tygj/8AmgqEUBfq4eSVaMcjs0DkFT
BixDoHvY3xfGHn8e02BBPVMnytzK7ustdjreKeXQqJgKBL91kAGM8iOVZ4YcaF59
Nc0YxusZuQb3zcfQHJP/SLfQJ6fHQOBm4iGljNBOTRysNJ8zAo518CyH66cqEYm0
PXAPPIwXylzotkEKyAUZEe+pSeewpKiFItLzFBHhZG8x5SHYvYsRGORDqAoGnaaY
BZWPGy6egwR2a5V99dq5olDb5oMybrpYMwRSGHF7XCvS4Igc4JkgXlTZ2X7NL2po
CCjkBYM+DVUmGwH4etvWMciFw3dH5C1JUbdkjjoqTyfkD4I0xw==
-----END CERTIFICATE-----
`,
        },
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CamerasModule,
    EventsModule,
    CapturesModule,
    UsersModule,
    CaptureRangeModule,
    InputCameraModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

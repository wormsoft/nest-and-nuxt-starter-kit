# Шаблон backend для nest + nuxt приложения

Это серверная часть общего шаблона для приложений, созданных с помощью Nest и Nuxt. 

## Проброс статики

В папке `static` лежит статичный html, js, css. Можно положить любое свое SPA. При сборке общего Docker образа сюда размещается Nuxt приложение из комплекта автоматически

## Запуск сервера

Запуск происходит с помощью стандартных механизмов от Nest

```bash
yarn install
yarn start:dev # запуск локального сервера с авторестартом по изменениями
yarn build # сборка проекта для прода
yarn start:prod # запуск в проде
```

## Подход к формированию конфигурации

Для конфигурации было принято не использовать штатный модуль `@nestjs/config` и используются обычные классы с валидацией через `class-validator`:

```typescript
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseConfig } from '@common/config/baseConfig';

export class DatabaseConfig extends BaseConfig {
  @IsNotEmpty()
  @IsString()
  readonly url: string = process.env.DATABASE_URL;
}
```

При запуске приложения переменная `url` проверяется через `class-validator` и приложение запускается если есть все необходимые значения переменных окружения. 

## Работа с БД

База данных вынесена в отдельный модуль `backend/src/infrastructure/database/database.module.ts`. Он подключается в корне приложения. Далее все файлы формата `*.entity.ts` автоматически становятся доступны через `EntityManager`

### Простановка переменной окружения

Конфигурация подключения к базе данных реализована в виде однострочной переменной окружения `DATABASE_URL`. Ее можно передавать при запуску или прописать в `.env` файле

```dotenv
DATABASE_URL=postgres://user:passwrod@localhost:5432/database?runMigrate=true&sync=true
```

* `user:password` - данные для входа в БД
* `5432` - порт подключения
* `database` - наименования базы данных
* `runMigration=true` - указание запускать ли миграции при старте приложения
* `sync=true` - указание работать ли через автоматическое обновление схемы БД на основании сущностей (sync режим для разработки)

### Работа с `typeorm.sh`

Для более удобной работы с `typeorm` был создан скрипт `typeorm.sh` и прописан его запуск через `package.json`. В нем подключается datasource из переменных окружений и упрощения создания миграции. 

Команда `yarn typeorm` запускает typeorm cli со всему достуными штатными командами. И было оптимизированно создание миграцией. Теперь для этого достаточно ввести `yarn typeorm mg init`, что создаст миграцию `init` в нужной папке для миграций. 
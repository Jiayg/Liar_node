import { LoggerService, LogLevel, Optional } from '@nestjs/common';
import * as os from 'os';
import clc = require('cli-color');

const yellow = clc.xterm(3);

export class MyLogger implements LoggerService {
    private static logLevels: LogLevel[] = [
        'log',
        'error',
        'warn',
        'debug',
        'verbose',
    ];
    private static lastTimestamp?: number;
    private static instance?: typeof MyLogger | LoggerService = MyLogger;

    constructor(
        @Optional() protected context?: string,
        @Optional() private readonly isTimestampEnabled = true,
    ) { }

    error(message: any, trace = '', context?: string) {
        const instance = this.getInstance();
        if (!this.isLogLevelEnabled('error')) {
            return;
        }
        instance &&
            instance.error.call(instance, message, trace, context || this.context);
    }

    log(message: any, context?: string) {
        this.callFunction('log', message, context);
    }

    warn(message: any, context?: string) {
        this.callFunction('warn', message, context);
    }

    debug(message: any, context?: string) {
        this.callFunction('debug', message, context);
    }

    verbose(message: any, context?: string) {
        this.callFunction('verbose', message, context);
    }

    setContext(context: string) {
        this.context = context;
    }

    static overrideMyLogger(logger: LoggerService | LogLevel[] | boolean) {
        if (Array.isArray(logger)) {
            this.logLevels = logger;
            return;
        }
        this.instance = ((typeof logger) == 'object') ? (logger as LoggerService) : undefined;
    }

    static log(message: any, context = '', isTimeDiffEnabled = true) {
        if (!MyLogger.isLogLevelEnabled('log')) {
            return;
        }
        this.printMessage(message, clc.green, context, isTimeDiffEnabled);
    }

    static error(
        message: any,
        trace = '',
        context = '',
        isTimeDiffEnabled = true,
    ) {
        this.printMessage(message, clc.red, context, isTimeDiffEnabled);
        this.printStackTrace(trace);
    }

    static warn(message: any, context = '', isTimeDiffEnabled = true) {
        if (!MyLogger.isLogLevelEnabled('warn')) {
            return;
        }
        this.printMessage(message, clc.yellow, context, isTimeDiffEnabled);
    }

    static debug(message: any, context = '', isTimeDiffEnabled = true) {
        if (!MyLogger.isLogLevelEnabled('debug')) {
            return;
        }
        this.printMessage(message, clc.magentaBright, context, isTimeDiffEnabled);
    }

    static verbose(message: any, context = '', isTimeDiffEnabled = true) {
        if (!MyLogger.isLogLevelEnabled('verbose')) {
            return;
        }
        this.printMessage(message, clc.cyanBright, context, isTimeDiffEnabled);
    }

    private callFunction(
        name: 'log' | 'warn' | 'debug' | 'verbose',
        message: any,
        context?: string,
    ) {
        if (!this.isLogLevelEnabled(name)) {
            return;
        }
        const instance = this.getInstance();
        const func = instance && (instance as typeof MyLogger)[name];
        func &&
            func.call(
                instance,
                message,
                context || this.context,
                this.isTimestampEnabled,
            );
    }

    private getInstance(): typeof MyLogger | LoggerService {
        const { instance } = MyLogger;
        return instance === this ? MyLogger : instance;
    }

    private isLogLevelEnabled(level: LogLevel): boolean {
        return MyLogger.logLevels.includes(level);
    }
    private static isLogLevelEnabled(level: LogLevel): boolean {
        return MyLogger.logLevels.includes(level);
    }

    private static printMessage(
        message: any,
        color: (message: string) => string,
        context = '',
        isTimeDiffEnabled?: boolean,
    ) {
        const localeStringOptions = {
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: '2-digit',
            month: '2-digit',
        };
        var timestamp = new Date(Date.now()).toLocaleString(
            undefined,
            localeStringOptions,
        );


        const isOverride = (process.env.IS_OVERRIDE_LOGGER);
        var colorYellow = yellow

        var ip = ''
        if (isOverride == 'true') {
            color = clc.white
            colorYellow = clc.white
            // ip = MyLogger.getIPAdress() + ' '
            timestamp = ''
        }

        const output = ((typeof message) == 'object')
            ? `${color('Object:')}\n${JSON.stringify(message, null, 2)}\n`
            : color(message);


        const pidMessage = color(`[Nest] ${process.pid}   - `);
        const contextMessage = context ? colorYellow(`[${context}] `) : '';
        const timestampDiff = this.updateAndGetTimestampDiff(isTimeDiffEnabled);

        process.stdout.write(
            `${ip}${pidMessage}${timestamp}   ${contextMessage}${output}${timestampDiff}\n`,
        );
    }

    private static updateAndGetTimestampDiff(
        isTimeDiffEnabled?: boolean,
    ): string {
        const isOverride = (process.env.IS_OVERRIDE_LOGGER);
        var colorYellow = yellow

        if (isOverride == 'true') colorYellow = clc.white

        const includeTimestamp = MyLogger.lastTimestamp && isTimeDiffEnabled;
        const result = includeTimestamp
            ? colorYellow(` +${Date.now() - MyLogger.lastTimestamp}ms`)
            : '';
        MyLogger.lastTimestamp = Date.now();
        return result;
    }


    private static printStackTrace(trace: string) {
        if (!trace) {
            return;
        }
        process.stdout.write(`${trace}\n`);
    }

    private static getIPAdress() {
        var interfaces = os.networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }

}

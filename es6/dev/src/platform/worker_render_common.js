import { CONST_EXPR } from 'angular2/src/facade/lang';
import { MessageBus } from 'angular2/src/web_workers/shared/message_bus';
import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { AnchorBasedAppRootUrl } from 'angular2/src/compiler/anchor_based_app_root_url';
import { AppRootUrl } from 'angular2/src/compiler/app_root_url';
import { ExceptionHandler, APPLICATION_COMMON_PROVIDERS, PLATFORM_COMMON_PROVIDERS, Renderer, PLATFORM_INITIALIZER } from 'angular2/core';
import { EVENT_MANAGER_PLUGINS, EventManager } from 'angular2/platform/common_dom';
import { Provider, OpaqueToken } from 'angular2/src/core/di';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { DomEventsPlugin } from 'angular2/src/platform/dom/events/dom_events';
import { KeyEventsPlugin } from 'angular2/src/platform/dom/events/key_events';
import { HammerGesturesPlugin } from 'angular2/src/platform/dom/events/hammer_gestures';
import { DOCUMENT } from 'angular2/src/platform/dom/dom_tokens';
import { DomRenderer, DomRenderer_ } from 'angular2/src/platform/dom/dom_renderer';
import { DomSharedStylesHost } from 'angular2/src/platform/dom/shared_styles_host';
import { SharedStylesHost } from "angular2/src/platform/dom/shared_styles_host";
import { BrowserDetails } from 'angular2/src/animate/browser_details';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { XHR } from 'angular2/compiler';
import { XHRImpl } from 'angular2/src/platform/browser/xhr_impl';
import { Testability } from 'angular2/src/core/testability/testability';
import { BrowserGetTestability } from 'angular2/src/platform/browser/testability';
import { BrowserDomAdapter } from './browser/browser_adapter';
import { wtfInit } from 'angular2/src/core/profile/wtf_init';
import { WebWorkerSetup } from 'angular2/src/web_workers/ui/setup';
import { MessageBasedRenderer } from 'angular2/src/web_workers/ui/renderer';
import { MessageBasedXHRImpl } from 'angular2/src/web_workers/ui/xhr_impl';
import { ServiceMessageBrokerFactory, ServiceMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/service_message_broker';
import { ClientMessageBrokerFactory, ClientMessageBrokerFactory_ } from 'angular2/src/web_workers/shared/client_message_broker';
import { Serializer } from 'angular2/src/web_workers/shared/serializer';
import { ON_WEB_WORKER } from 'angular2/src/web_workers/shared/api';
import { RenderProtoViewRefStore } from 'angular2/src/web_workers/shared/render_proto_view_ref_store';
import { RenderViewWithFragmentsStore } from 'angular2/src/web_workers/shared/render_view_with_fragments_store';
export const WORKER_SCRIPT = CONST_EXPR(new OpaqueToken("WebWorkerScript"));
// Message based Worker classes that listen on the MessageBus
export const WORKER_RENDER_MESSAGING_PROVIDERS = CONST_EXPR([MessageBasedRenderer, MessageBasedXHRImpl, WebWorkerSetup]);
export const WORKER_RENDER_PLATFORM = CONST_EXPR([
    PLATFORM_COMMON_PROVIDERS,
    new Provider(PLATFORM_INITIALIZER, { useValue: initWebWorkerRenderPlatform, multi: true })
]);
export const WORKER_RENDER_APP_COMMON = CONST_EXPR([
    APPLICATION_COMMON_PROVIDERS,
    WORKER_RENDER_MESSAGING_PROVIDERS,
    new Provider(ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
    new Provider(DOCUMENT, { useFactory: _document, deps: [] }),
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: DomEventsPlugin, multi: true }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: KeyEventsPlugin, multi: true }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: HammerGesturesPlugin, multi: true }),
    new Provider(DomRenderer, { useClass: DomRenderer_ }),
    new Provider(Renderer, { useExisting: DomRenderer }),
    new Provider(SharedStylesHost, { useExisting: DomSharedStylesHost }),
    new Provider(XHR, { useClass: XHRImpl }),
    MessageBasedXHRImpl,
    new Provider(ServiceMessageBrokerFactory, { useClass: ServiceMessageBrokerFactory_ }),
    new Provider(ClientMessageBrokerFactory, { useClass: ClientMessageBrokerFactory_ }),
    AnchorBasedAppRootUrl,
    new Provider(AppRootUrl, { useExisting: AnchorBasedAppRootUrl }),
    Serializer,
    new Provider(ON_WEB_WORKER, { useValue: false }),
    RenderViewWithFragmentsStore,
    RenderProtoViewRefStore,
    DomSharedStylesHost,
    Testability,
    BrowserDetails,
    AnimationBuilder,
    EventManager
]);
export function initializeGenericWorkerRenderer(injector) {
    var bus = injector.get(MessageBus);
    let zone = injector.get(NgZone);
    bus.attachToZone(zone);
    zone.run(() => {
        WORKER_RENDER_MESSAGING_PROVIDERS.forEach((token) => { injector.get(token).start(); });
    });
}
export function initWebWorkerRenderPlatform() {
    BrowserDomAdapter.makeCurrent();
    wtfInit();
    BrowserGetTestability.init();
}
function _exceptionHandler() {
    return new ExceptionHandler(DOM, false);
}
function _document() {
    return DOM.defaultDoc();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlcl9jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX3JlbmRlcl9jb21tb24udHMiXSwibmFtZXMiOlsiaW5pdGlhbGl6ZUdlbmVyaWNXb3JrZXJSZW5kZXJlciIsImluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybSIsIl9leGNlcHRpb25IYW5kbGVyIiwiX2RvY3VtZW50Il0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDBCQUEwQjtPQUM1QyxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QztPQUMvRCxFQUFDLE1BQU0sRUFBQyxNQUFNLGdDQUFnQztPQUM5QyxFQUFDLHFCQUFxQixFQUFDLE1BQU0saURBQWlEO09BQzlFLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0NBQW9DO09BQ3RELEVBS0wsZ0JBQWdCLEVBR2hCLDRCQUE0QixFQUM1Qix5QkFBeUIsRUFDekIsUUFBUSxFQUNSLG9CQUFvQixFQUVyQixNQUFNLGVBQWU7T0FDZixFQUFDLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLDhCQUE4QjtPQUN6RSxFQUFVLFFBQVEsRUFBWSxXQUFXLEVBQUMsTUFBTSxzQkFBc0I7T0FFdEUsRUFBQyxHQUFHLEVBQUMsTUFBTSx1Q0FBdUM7T0FDbEQsRUFBQyxlQUFlLEVBQUMsTUFBTSw2Q0FBNkM7T0FDcEUsRUFBQyxlQUFlLEVBQUMsTUFBTSw2Q0FBNkM7T0FDcEUsRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtEQUFrRDtPQUM5RSxFQUFDLFFBQVEsRUFBQyxNQUFNLHNDQUFzQztPQUN0RCxFQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSx3Q0FBd0M7T0FDekUsRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhDQUE4QztPQUN6RSxFQUFDLGdCQUFnQixFQUFDLE1BQU0sOENBQThDO09BQ3RFLEVBQUMsY0FBYyxFQUFDLE1BQU0sc0NBQXNDO09BQzVELEVBQUMs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bnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7Tmdab25lfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS96b25lL25nX3pvbmUnO1xuaW1wb3J0IHtBbmNob3JCYXNlZEFwcFJvb3RVcmx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9hbmNob3JfYmFzZWRfYXBwX3Jvb3RfdXJsJztcbmltcG9ydCB7QXBwUm9vdFVybH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2FwcF9yb290X3VybCc7XG5pbXBvcnQge1xuICBQTEFURk9STV9ESVJFQ1RJVkVTLFxuICBQTEFURk9STV9QSVBFUyxcbiAgQ29tcG9uZW50UmVmLFxuICBwbGF0Zm9ybSxcbiAgRXhjZXB0aW9uSGFuZGxlcixcbiAgUmVmbGVjdG9yLFxuICByZWZsZWN0b3IsXG4gIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsXG4gIFBMQVRGT1JNX0NPTU1PTl9QUk9WSURFUlMsXG4gIFJlbmRlcmVyLFxuICBQTEFURk9STV9JTklUSUFMSVpFUixcbiAgQVBQX0lOSVRJQUxJWkVSXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIEV2ZW50TWFuYWdlcn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5pbXBvcnQge3Byb3ZpZGUsIFByb3ZpZGVyLCBJbmplY3RvciwgT3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbi8vIFRPRE8gY2hhbmdlIHRoZXNlIGltcG9ydHMgb25jZSBkb21fYWRhcHRlciBpcyBtb3ZlZCBvdXQgb2YgY29yZVxuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtEb21FdmVudHNQbHVnaW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuaW1wb3J0IHtLZXlFdmVudHNQbHVnaW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2tleV9ldmVudHMnO1xuaW1wb3J0IHtIYW1tZXJHZXN0dXJlc1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvaGFtbWVyX2dlc3R1cmVzJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3Rva2Vucyc7XG5pbXBvcnQge0RvbVJlbmRlcmVyLCBEb21SZW5kZXJlcl99IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3JlbmRlcmVyJztcbmltcG9ydCB7RG9tU2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuaW1wb3J0IHtTaGFyZWRTdHlsZXNIb3N0fSBmcm9tIFwiYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3RcIjtcbmltcG9ydCB7QnJvd3NlckRldGFpbHN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2Jyb3dzZXJfZGV0YWlscyc7XG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9jb21waWxlcic7XG5pbXBvcnQge1hIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9pbXBsJztcbmltcG9ydCB7VGVzdGFiaWxpdHl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7QnJvd3NlckdldFRlc3RhYmlsaXR5fSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90ZXN0YWJpbGl0eSc7XG5pbXBvcnQge0Jyb3dzZXJEb21BZGFwdGVyfSBmcm9tICcuL2Jyb3dzZXIvYnJvd3Nlcl9hZGFwdGVyJztcbmltcG9ydCB7d3RmSW5pdH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcHJvZmlsZS93dGZfaW5pdCc7XG5pbXBvcnQge1dlYldvcmtlclNldHVwfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvc2V0dXAnO1xuaW1wb3J0IHtNZXNzYWdlQmFzZWRSZW5kZXJlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyJztcbmltcG9ydCB7TWVzc2FnZUJhc2VkWEhSSW1wbH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL3hocl9pbXBsJztcbmltcG9ydCB7XG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5X1xufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5X1xufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge09OX1dFQl9XT1JLRVJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvYXBpJztcbmltcG9ydCB7UmVuZGVyUHJvdG9WaWV3UmVmU3RvcmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3Byb3RvX3ZpZXdfcmVmX3N0b3JlJztcbmltcG9ydCB7XG4gIFJlbmRlclZpZXdXaXRoRnJhZ21lbnRzU3RvcmVcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfdmlld193aXRoX2ZyYWdtZW50c19zdG9yZSc7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfU0NSSVBUOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKFwiV2ViV29ya2VyU2NyaXB0XCIpKTtcblxuLy8gTWVzc2FnZSBiYXNlZCBXb3JrZXIgY2xhc3NlcyB0aGF0IGxpc3RlbiBvbiB0aGUgTWVzc2FnZUJ1c1xuZXhwb3J0IGNvbnN0IFdPUktFUl9SRU5ERVJfTUVTU0FHSU5HX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPVxuICAgIENPTlNUX0VYUFIoW01lc3NhZ2VCYXNlZFJlbmRlcmVyLCBNZXNzYWdlQmFzZWRYSFJJbXBsLCBXZWJXb3JrZXJTZXR1cF0pO1xuXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9QTEFURk9STTogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgUExBVEZPUk1fQ09NTU9OX1BST1ZJREVSUyxcbiAgbmV3IFByb3ZpZGVyKFBMQVRGT1JNX0lOSVRJQUxJWkVSLCB7dXNlVmFsdWU6IGluaXRXZWJXb3JrZXJSZW5kZXJQbGF0Zm9ybSwgbXVsdGk6IHRydWV9KVxuXSk7XG5cbmV4cG9ydCBjb25zdCBXT1JLRVJfUkVOREVSX0FQUF9DT01NT046IEFycmF5PGFueSAvKlR5cGUgfCBQcm92aWRlciB8IGFueVtdKi8+ID0gQ09OU1RfRVhQUihbXG4gIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsXG4gIFdPUktFUl9SRU5ERVJfTUVTU0FHSU5HX1BST1ZJREVSUyxcbiAgbmV3IFByb3ZpZGVyKEV4Y2VwdGlvbkhhbmRsZXIsIHt1c2VGYWN0b3J5OiBfZXhjZXB0aW9uSGFuZGxlciwgZGVwczogW119KSxcbiAgbmV3IFByb3ZpZGVyKERPQ1VNRU5ULCB7dXNlRmFjdG9yeTogX2RvY3VtZW50LCBkZXBzOiBbXX0pLFxuICAvLyBUT0RPKGp0ZXBsaXR6NjAyKTogSW52ZXN0aWdhdGUgaWYgd2UgZGVmaW5pdGVseSBuZWVkIEVWRU5UX01BTkFHRVIgb24gdGhlIHJlbmRlciB0aHJlYWRcbiAgLy8gIzUyOThcbiAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHt1c2VDbGFzczogS2V5RXZlbnRzUGx1Z2luLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB7dXNlQ2xhc3M6IEhhbW1lckdlc3R1cmVzUGx1Z2luLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoRG9tUmVuZGVyZXIsIHt1c2VDbGFzczogRG9tUmVuZGVyZXJffSksXG4gIG5ldyBQcm92aWRlcihSZW5kZXJlciwge3VzZUV4aXN0aW5nOiBEb21SZW5kZXJlcn0pLFxuICBuZXcgUHJvdmlkZXIoU2hhcmVkU3R5bGVzSG9zdCwge3VzZUV4aXN0aW5nOiBEb21TaGFyZWRTdHlsZXNIb3N0fSksXG4gIG5ldyBQcm92aWRlcihYSFIsIHt1c2VDbGFzczogWEhSSW1wbH0pLFxuICBNZXNzYWdlQmFzZWRYSFJJbXBsLFxuICBuZXcgUHJvdmlkZXIoU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LCB7dXNlQ2xhc3M6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeV99KSxcbiAgbmV3IFByb3ZpZGVyKENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5LCB7dXNlQ2xhc3M6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5X30pLFxuICBBbmNob3JCYXNlZEFwcFJvb3RVcmwsXG4gIG5ldyBQcm92aWRlcihBcHBSb290VXJsLCB7dXNlRXhpc3Rpbmc6IEFuY2hvckJhc2VkQXBwUm9vdFVybH0pLFxuICBTZXJpYWxpemVyLFxuICBuZXcgUHJvdmlkZXIoT05fV0VCX1dPUktFUiwge3VzZVZhbHVlOiBmYWxzZX0pLFxuICBSZW5kZXJWaWV3V2l0aEZyYWdtZW50c1N0b3JlLFxuICBSZW5kZXJQcm90b1ZpZXdSZWZTdG9yZSxcbiAgRG9tU2hhcmVkU3R5bGVzSG9zdCxcbiAgVGVzdGFiaWxpdHksXG4gIEJyb3dzZXJEZXRhaWxzLFxuICBBbmltYXRpb25CdWlsZGVyLFxuICBFdmVudE1hbmFnZXJcbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUdlbmVyaWNXb3JrZXJSZW5kZXJlcihpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgdmFyIGJ1cyA9IGluamVjdG9yLmdldChNZXNzYWdlQnVzKTtcbiAgbGV0IHpvbmUgPSBpbmplY3Rvci5nZXQoTmdab25lKTtcbiAgYnVzLmF0dGFjaFRvWm9uZSh6b25lKTtcblxuICB6b25lLnJ1bigoKSA9PiB7XG4gICAgV09SS0VSX1JFTkRFUl9NRVNTQUdJTkdfUFJPVklERVJTLmZvckVhY2goKHRva2VuKSA9PiB7IGluamVjdG9yLmdldCh0b2tlbikuc3RhcnQoKTsgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdFdlYldvcmtlclJlbmRlclBsYXRmb3JtKCk6IHZvaWQge1xuICBCcm93c2VyRG9tQWRhcHRlci5tYWtlQ3VycmVudCgpO1xuICB3dGZJbml0KCk7XG4gIEJyb3dzZXJHZXRUZXN0YWJpbGl0eS5pbml0KCk7XG59XG5cbmZ1bmN0aW9uIF9leGNlcHRpb25IYW5kbGVyKCk6IEV4Y2VwdGlvbkhhbmRsZXIge1xuICByZXR1cm4gbmV3IEV4Y2VwdGlvbkhhbmRsZXIoRE9NLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIF9kb2N1bWVudCgpOiBhbnkge1xuICByZXR1cm4gRE9NLmRlZmF1bHREb2MoKTtcbn1cbiJdfQ==
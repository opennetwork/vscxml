import { VNode } from "@opennetwork/vnode";
import { h, renderToStateChart } from "./index";

const state: VNode = (
    <scxml>

        <datamodel>
            <data id="eventStamp"/>
            <data id="rectX" expr="0"/>
            <data id="rectY" expr="0"/>
            <data id="dx"/>
            <data id="dy"/>
        </datamodel>

        <state id="idle">
            <transition event="mousedown" target="dragging">
                <assign location="eventStamp" expr="_event.data"/>
            </transition>
        </state>

        <state id="dragging">
            <transition event="mouseup" target="idle"/>
            <transition event="mousemove" target="dragging">
                <assign location="dx" expr="eventStamp.clientX - _event.data.clientX"/>
                <assign location="dy" expr="eventStamp.clientY - _event.data.clientY"/>
                <assign location="rectX" expr="rectX - dx"/>
                <assign location="rectY" expr="rectY - dy"/>
                <assign location="eventStamp" expr="_event.data"/>
            </transition>
        </state>

    </scxml>
);

const stateChart = await renderToStateChart(state);

stateChart.start();

stateChart.gen("mousedown");
stateChart.gen("mousemove", {
    clientX: 10,
    clientY: 10
});
stateChart.gen("mouseup");










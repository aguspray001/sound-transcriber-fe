import React from "react";
import WaveSurfer from "wavesurfer.js";
import WaveSurferRegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";
import WaveSurferTimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline";
import WaveSurferMinimapPlugin from "wavesurfer.js/dist/plugin/wavesurfer.minimap";
import { useEffect } from "react";
import FormUpload from "../../components/molecules/FormUpload";
import WaveformDisplayer from "../../components/molecules/WaveformDisplayer";
import { useState } from "react";
import axios from "axios";
import Alert from "../../components/molecules/Alert";
import SegmentCard from "../../components/molecules/SegmentCard";
import { API_PORT, API_URL } from "../../constant/uri";
import { randomColor } from "../../utils/audioUtils";
import TextBox from "../../components/molecules/TextBox";

function TranscribePage() {
  const [dataWaveform, setDataWaveform] = useState({
    file_name: null,
    db_threshold: null,
    min_silence_len: null,
  });

  const [wavesurferState, setWavesurferState] = useState(null);
  const [wavListData, setWavListData] = useState(null);
  const [segmentListData, setSegmentListData] = useState(null);
  const [selectedWavList, setSelectedWavList] = useState(null);

  // const regions = [
  //   {
  //     start: 100,
  //     end: 180,
  //     color: "hsla(400, 100%, 30%, 0.1)",
  //   },
  //   {
  //     start: 200,
  //     end: 400,
  //     color: "hsla(200, 50%, 70%, 0.1)",
  //   },
  // ];

  const getWavList = async () => {
    const respWavList = await axios({
      method: "get",
      url: `http://${API_URL}:${API_PORT}/wav`,
    });
    setWavListData(respWavList.data.data);
    console.log(respWavList.data.data);
  };

  const getSegmentList = async (file_name, db_threshold, min_silence_len) => {
    const respSegmentList = await axios.post(
      "http://103.106.72.182:36002/audio/split",
      {
        file_name,
        db_threshold,
        min_silence_len,
      }
    );
    return respSegmentList.data.segments;
  };

  const onTranscriptFile = async () => {
    const resp = getSegmentList();
    console.log(resp);
    setSegmentListData(resp);
  };

  const onSelectWavList = (e) => {
    setDataWaveform({
      ...dataWaveform,
      ["file_name"]: e.target.value,
    });
    setSelectedWavList(e.target.value);
  };

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: "#wave",
      waveColor: "#FF7000",
      progressColor: "#1AAFFF",
      height: 190,
      scrollParent: false,
      zoom: 40,
      minimap: true,
      plugins: [
        WaveSurferRegionsPlugin.create(),
        WaveSurferMinimapPlugin.create({
          height: 30,
          waveColor: "#ddd",
          progressColor: "#999",
          cursorColor: "#999",
        }),
        WaveSurferTimelinePlugin.create({
          container: "#wave-timeline",
        }),
      ],
    });
    setWavesurferState(wavesurfer);
    getWavList();
  }, []);

  const onChange = (e) => {
    setDataWaveform({
      ...dataWaveform,
      [e.target.name]: e.target.value,
    });
    console.log(dataWaveform);
  };

  const onFileChange = (e) => {
    setDataWaveform({
      ...dataWaveform,
      [e.target.name]: e.target.files[0],
    });

    if (e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        let blob = new window.Blob([new Uint8Array(e.target.result)]);
        wavesurferState.loadBlob(blob);
      };

      reader.onerror = function (evt) {
        console.error("An error ocurred reading the file: ", evt);
      };
      // Read File as an ArrayBuffer
      reader.readAsArrayBuffer(e.target.files[0]);

      wavesurferState.on("ready", function () {
        wavesurferState.play();
          fetch("./annotations.json")
            .then((r) => {
              r.json();
            })
            .then((data) => {
              console.log(data);
              loadRegions(data);
              saveRegions();
            }).catch(err=>console.log(err))
      });
    }
  };

  const onSendData = () => {
    const data = new FormData();
    data.append("file", dataWaveform.file_name);

    if (dataWaveform.db_threshold === "" || null || undefined) {
      Alert({
        title: "Error",
        text: "Parameter DB Threshold tidak boleh kosong",
        icon: "error",
      });
    } else if (dataWaveform.min_silence_len === "" || null || undefined) {
      Alert({
        title: "Error",
        text: "Parameter Minimum Silence Length tidak boleh kosong",
        icon: "error",
      });
    } else if (data.file_name === null) {
      Alert({
        title: "Error",
        text: "Periksa input file .Wav anda",
        icon: "error",
      });
    } else {
      axios({
        method: "post",
        url: `http://${API_URL}:${API_PORT}/wav/upload`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res);
          Alert({
            title: "Success",
            text: "Success send the .wav file to server!",
            icon: "success",
          });
          // if uploaded, then get the segment
          const dataaa = [
            { start: 116.9, end: 216.2, data: {} },
            { start: 300.5, end: 400.5, data: {} },
            { start: 444.4, end: 600.3, data: {} },
          ];
          loadRegions(dataaa);
        })
        .catch((err) => {
          Alert({ title: "Error", text: err, icon: "error" });
          console.log(err);
        });
    }
  };

  const onPlay = () => {
    wavesurferState.play();
  };

  const onPause = () => {
    wavesurferState.pause();
  };

  function saveRegions() {
    localStorage.regions = JSON.stringify(
      Object.keys(wavesurferState.regions.list).map(function (id) {
        let region = wavesurferState.regions.list[id];
        return {
          start: region.start,
          end: region.end,
          attributes: region.attributes,
          data: region.data,
        };
      })
    );
  }

  /**
   * Load regions from localStorage.
   */
  function loadRegions(regions) {
    regions.forEach(function (region) {
      region.color = randomColor(0.1);
      wavesurferState.addRegion(region);
    });
  }

  return (
    <div className="container mx-auto h-full">
      <div className="flex flex-col justify-around items-center sm:items-stretch py-10 sm:flex-row">
        <FormUpload
          onChange={onChange}
          onFileChange={onFileChange}
          onUpload={onSendData}
          onTranscript={onTranscriptFile}
          dataWaveform={wavListData || null}
          onSelectWavList={onSelectWavList}
          selectedWavList={selectedWavList}
        />
        <WaveformDisplayer
          input={true}
          title="Input Waveform"
          onPause={onPause}
          onPlay={onPlay}
        />
      </div>
      <div className="flex flex-col justify-around items-center sm:items-stretch py-10 sm:flex-row">
        <SegmentCard segments={segmentListData} />
        <WaveformDisplayer
          input={true}
          title="Segment Waveform"
          onPause={onPause}
          onPlay={onPlay}
        />
      </div>
      <TextBox
        value={"deadawed"}
        onChange={(e) => console.log(e)}
        title={"Original Transcription"}
        onSave={console.log("")}
      />
      <TextBox
        value={"deadawed"}
        onChange={(e) => console.log(e)}
        title={"Normalized Transcription"}
        onSave={console.log("")}
      />
    </div>
  );
}

export default TranscribePage;

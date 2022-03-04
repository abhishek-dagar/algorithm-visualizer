import React from "react";
import { connect } from "react-redux";
import InputRange from "react-input-range";
import faPlay from "@fortawesome/fontawesome-free-solid/faPlay";
import { faRedo } from "@fortawesome/fontawesome-free-solid";
import faChevronLeft from "@fortawesome/fontawesome-free-solid/faChevronLeft";
import faChevronRight from "@fortawesome/fontawesome-free-solid/faChevronRight";
import faPause from "@fortawesome/fontawesome-free-solid/faPause";
import faWrench from "@fortawesome/fontawesome-free-solid/faWrench";
import { classes, extension } from "common/util";
import { actions } from "reducers";
import { BaseComponent, Button, ProgressBar } from "..";
import styles from "./Player.module.scss";
import { TracerApi } from "apis";
import axios from "axios";

class Player extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      speed: 2,
      playing: false,
      building: false,
    };

    this.tracerApiSource = null;
    this.refresh = this.refresh.bind(this);

    this.reset();
  }

  componentDidMount() {
    const { editingFile, shouldBuild } = this.props.current;
    if (shouldBuild) {
      this.build(editingFile);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { editingFile, shouldBuild } = nextProps.current;
    if (editingFile !== this.props.current.editingFile) {
      if (shouldBuild) {
        this.build(editingFile);
      }
    }
  }

  reset(commands = []) {
    const chunks = [
      {
        commands: [],
        lineNumber: undefined,
      },
    ];
    while (commands.length) {
      const command = commands.shift();
      const { key, method, args } = command;
      if (key === null && method === "delay") {
        const [lineNumber] = args;
        chunks[chunks.length - 1].lineNumber = lineNumber;
        chunks.push({
          commands: [],
          lineNumber: undefined,
        });
      } else {
        chunks[chunks.length - 1].commands.push(command);
      }
    }
    this.props.setChunks(chunks);
    this.props.setCursor(0);
    this.pause();
    this.props.setLineIndicator(undefined);
    this.props.setCursor(1);
  }

  build(file) {
    if (!file) return;
    this.reset();
    this.setState({ editingFile: file });
    this.setState({ building: true });
    const ext = extension(file.name);
    setTimeout(
      () => {
        if (this.tracerApiSource) this.tracerApiSource.cancel();
        this.tracerApiSource = axios.CancelToken.source();
        if (ext in TracerApi) {
          TracerApi[ext](
            { code: file.content, name: file.name },
            undefined,
            this.tracerApiSource.token
          )
            .then((commands) => {
              this.tracerApiSource = null;
              this.reset(commands);
              this.setState({ building: false });
            })
            .catch((error) => {
              if (axios.isCancel(error)) return;
              this.tracerApiSource = null;
              this.setState({ building: false });
              this.handleError(error);
            });
        }
      },
      ext === "md" ? 0 : 1000
    );
  }

  isValidCursor(cursor) {
    const { chunks } = this.props.player;
    return 1 <= cursor && cursor <= chunks.length;
  }

  prev() {
    this.pause();
    const cursor = this.props.player.cursor - 1;
    if (!this.isValidCursor(cursor)) return false;
    this.props.setCursor(cursor);
    return true;
  }

  resume(wrap = false) {
    this.pause();
    if (this.next() || (wrap && this.props.setCursor(1))) {
      const interval = 4000 / Math.pow(Math.E, this.state.speed);
      if (typeof window != undefined) {
        this.timer = window.setTimeout(() => this.resume(), interval);
      }
      this.setState({ playing: true });
    }
  }

  pause() {
    if (this.timer) {
      if (typeof window != undefined) {
        window.clearTimeout(this.timer);
      }
      this.timer = undefined;
      this.setState({ playing: false });
    }
  }

  next() {
    this.pause();
    const cursor = this.props.player.cursor + 1;
    if (!this.isValidCursor(cursor)) return false;
    this.props.setCursor(cursor);
    return true;
  }

  refresh() {
    this.props.setCursor(1);
  }

  handleChangeSpeed(speed) {
    this.setState({ speed });
  }

  handleChangeProgress(progress) {
    const { chunks } = this.props.player;
    const cursor = Math.max(
      1,
      Math.min(chunks.length, Math.round(progress * chunks.length))
    );
    this.pause();
    this.props.setCursor(cursor);
  }

  render() {
    const { className } = this.props;
    const { editingFile } = this.props.current;
    const { chunks, cursor } = this.props.player;
    const { speed, playing, building } = this.state;
    const { Theme } = this.props.Theme;

    return (
      <div
        className={classes(
          styles.player,
          Theme === "Light"
            ? styles.playerLight
            : Theme === "Dark"
            ? styles.playerDark
            : styles.playerLight,
          className
        )}
      >
        <Button
          icon={faWrench}
          primary
          disabled={building}
          inProgress={building}
          onClick={() => this.build(editingFile)}
        >
          {building ? "Building" : "Build"}
        </Button>
        <Button icon={faRedo} primary onClick={this.refresh}>
          Refresh
        </Button>
        {playing ? (
          <Button icon={faPause} primary active onClick={() => this.pause()}>
            Pause
          </Button>
        ) : (
          <Button icon={faPlay} primary onClick={() => this.resume(true)}>
            Play
          </Button>
        )}
        <Button
          icon={faChevronLeft}
          primary
          disabled={!this.isValidCursor(cursor - 1)}
          onClick={() => this.prev()}
        />
        <ProgressBar
          className={styles.progress_bar}
          current={cursor}
          total={chunks.length}
          onChangeProgress={(progress) => this.handleChangeProgress(progress)}
        />
        <Button
          icon={faChevronRight}
          reverse
          primary
          disabled={!this.isValidCursor(cursor + 1)}
          onClick={() => this.next()}
        />
        <div className={styles.speed}>
          Speed
          <InputRange
            classNames={{
              inputRange: styles.range,
              labelContainer: styles.range_label_container,
              slider: styles.range_slider,
              track: styles.range_track,
            }}
            minValue={0}
            maxValue={4}
            step={0.5}
            value={speed}
            onChange={(speed) => this.handleChangeSpeed(speed)}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  ({ current, player, Theme }) => ({ current, player, Theme }),
  actions
)(Player);

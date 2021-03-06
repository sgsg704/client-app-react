import React, { Component } from "react";
import { imgURL } from "utils/constants";
import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
import { addComma } from "utils/helperFunctions";

class BasicInfo extends Component {
  render() {
    const { data, validatorsData, queueData } = this.props;
    return (
      <>
      <section className="stats__section">
        {data &&
        <div className="stats__row">
          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-epoch"></i>
            </div>
            <div className="stats__desc">
            <Link
                href={"/epoch/[key]"}
                as={`/epoch/${data.currentEpoch}`}
              >
                <a className="stats__value">{data.currentEpoch ? data.currentEpoch : '---'}</a>
              </Link>
              <p className="stats__title">current epoch</p>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-epoch"></i>
            </div>
            <div className="stats__desc">
            <Link
                href={"/epoch/[key]"}
                as={`/epoch/${data.finalizedEpoch}`}
              >
                <a className="stats__value">{data.finalizedEpoch ? data.finalizedEpoch : '---'}</a>
              </Link>
              <p className="stats__title">finalised epoch</p>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-validators"></i>
            </div>
            <div className="stats__desc">
             <span className="stats__value"> {data.activeValidators
                        ? addComma(data.activeValidators)
                        : "---"}</span>
              <p className="stats__title">Active validators</p>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-validators-pending"></i>
            </div>
            <div className="stats__desc">
              <span className="stats__value"> {data.pendingValidators
                        ? addComma(data.pendingValidators)
                        : "---"}</span>
              <p className="stats__title">Pending validators</p>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-peer"></i>
            </div>
            <div className="stats__desc">
               <span className="stats__value">{data.peersCount ? addComma(data.peersCount) : '---'}</span>
              <p className="stats__title">Peers</p>
            </div>
          </div>

          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-money"></i>
            </div>
            <div className="stats__desc">
               <span className="stats__value">{data.price ? '$' + addComma(Math.round(data.price * 100) / 100) : '---'}</span>
              <p className="stats__title">Price</p>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-hourglass"></i>
            </div>
            <div className="stats__desc">
            <Link
                href={"/slot/[key]"}
                as={`/slot/${data.currentSlot}`}
              >
                <a className="stats__value">{data.currentSlot ? data.currentSlot : '---'}</a>
              </Link>
              <p className="stats__title">Current slot</p>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-hourglass-1"></i>
            </div>
            <div className="stats__desc">
            <Link
                href={"/slot/[key]"}
                as={`/slot/${data.finalizedSlot}`}
              >
                <a className="stats__value">{data.finalizedSlot ? data.finalizedSlot : '---'}</a>
              </Link>
              <p className="stats__title">Finalised slot</p>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-epoch"></i>
            </div>
            <div className="stats__desc">
               <span className="stats__value">{data.votedEther ? addComma(Math.round(data.votedEther)): '---'}</span>
              <p className="stats__title">Voted ether</p>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icons">
              <i className="icon-epoch"></i>
            </div>
            <div className="stats__desc">
              <span className="stats__value">{data.eligibleEther ? addComma(Math.round(data.eligibleEther)) : '---'}</span>
              <p className="stats__title">Eligible ether</p>
            </div>
          </div>
        </div>
        }
      </section>
      </>
    );
  }
}
export default BasicInfo;

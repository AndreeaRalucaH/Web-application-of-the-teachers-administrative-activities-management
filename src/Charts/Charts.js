import { Button, Grid, Paper } from '@material-ui/core';
import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { BarChartFill, PieChartFill, GraphUp } from 'react-bootstrap-icons/build';
import CardNrTotalActivitati from './PaperNrTotalActiv'

const styles = theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(10),
        backgroundColor: '#61A0AF',
        color: "white",
        fontSize: 13,

    },
})

class Grafice extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }


    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
    }



    render() {
        const { classes } = this.props;
        // console.log(this.props.onClickGrafic)
        // console.log(this.props.onClickNrActivTotale)
        // console.log(this.props.onClickStatusActiv)

        return (
            <Container maxWidth="lg" className={classes.container}>
                <div>
                    <Button variant='contained' startIcon={<BarChartFill />} className={classes.submit} onClick={() => {

                        this.props.afiseazaGrafic()
                    }
                    } >Grafic total activitati pe ani</Button>
                    <Button variant='contained' startIcon={<GraphUp />} className={classes.submit} onClick={() => {

                        this.props.afiseazaEvolutie()
                    }
                    } >Evolutia numarului de activitati in ani</Button>
                    <Button variant='contained' startIcon={<PieChartFill />} className={classes.submit} onClick={() => {
                        this.props.afiseazaPieChart()
                    }
                    } >Numar activitati in functie de status</Button>

                    {this.props.onClickGrafic === false && this.props.onClickEvolutie === false && this.props.onClickStatusActiv === false
                        ? "" : this.props.onClickGrafic === true && this.props.onClickEvolutie === false && this.props.onClickStatusActiv === false
                            ? <div className="chart">

                                <Bar
                                    data={this.props.graficDate}
                                    options={{
                                        plugins: {
                                            title: {
                                                display: this.props.displayTitle,
                                                text: "Total activități realizate pe ani",
                                                padding: {
                                                    top: 10,
                                                    bottom: 30
                                                },
                                                font: { size: 16 }
                                            },
                                            legend: {
                                                display: this.props.displayLegend,
                                                position: this.props.legendPosition,
                                                labels: { font: { size: 14 } }
                                            },
                                        },
                                        animation: this.props.animation
                                    }}

                                />
                            </div>
                            : this.props.onClickGrafic === false && this.props.onClickEvolutie === true && this.props.onClickStatusActiv === false
                                ? <div className="chart">

                                    <Line
                                        data={this.props.graficDate}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: this.props.displayTitle,
                                                    text: "Evoluția activităților realizate in ani",
                                                    padding: {
                                                        top: 10,
                                                        bottom: 30
                                                    },
                                                    font: { size: 16 }
                                                },
                                                legend: {
                                                    display: this.props.displayLegend,
                                                    position: this.props.legendPosition,
                                                    labels: { font: { size: 14 } }
                                                },
                                            },
                                            animation: this.props.animation

                                        }}

                                    />
                                </div> :
                                <div className="chart">

                                    <Pie
                                        data={this.props.graficPieDate}
                                        height={700}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: this.props.displayTitle,
                                                    text: "Numar activitati în funcție de status in anul curent",
                                                    padding: {
                                                        top: 10,
                                                        bottom: 30
                                                    },
                                                    font: { size: 16 }
                                                },
                                                legend: {
                                                    display: this.props.displayLegend,
                                                    position: this.props.legendPosition,
                                                    labels: { font: { size: 14 } }
                                                },
                                            },
                                            // animation: true,
                                            maintainAspectRatio: false,

                                            
                                        }}

                                    />
                                </div>}



                </div>

            </Container>

        )
    }
}

export default withStyles(styles)(Grafice);
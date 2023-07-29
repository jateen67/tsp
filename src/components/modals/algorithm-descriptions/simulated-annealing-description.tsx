export default function SimulatedAnnealing() {
  return (
    <>
      <div className="title">
        <h2>Simulated Annealing</h2>
      </div>
      <div className="body">
        <p className="desc">
          There's a lot of interesting theory behind this algorithm, so
          apologies for this essay :P
        </p>
        <p className="desc">
          This is a probabilistic optimization algorithm inspired by the
          annealing process in metallurgy, commonly used to solve combinatorial
          optimization problems, like this one. The main idea is to mimic the
          annealing process of slowly cooling a material to reach a low-energy
          state, which allows the atoms to settle into an optimal configuration.
          Similarly, Simulated Annealing explores the solution space by
          iteratively making small random changes to the current solution and
          accepting these changes based on some probabilistic criteria.
        </p>
        <p className="desc">
          During execution, it starts with an arbitrary initial solution, often
          obtained through a heuristic or random approach. Then, it repeatedly
          generates neighbouring solutions by applying small perturbations to
          the current solution, such as swapping two cities' positions in the
          completed path. If the new solution successfully shortens the total
          path length of the initial completed path, it is accepted as the new
          current solution. However, if the new solution worsens the objective
          function, it is still accepted with a certain probability. This
          probability is determined by a temperature parameter that controls the
          likelihood of accepting worse solutions early in the algorithm. As the
          algorithm progresses, the temperature decreases, reducing the
          probability of accepting worse solutions, and the process converges
          towards an optimal or near-optimal solution.
        </p>
        <p className="desc">
          Simulated Annealing is particularly useful in scenarios where finding
          an exact solution is computationally infeasible due to the enormous
          solution space. By allowing the algorithm to accept worse solutions
          with a certain probability, it can escape local optima and explore
          different regions of the solution space. This property makes Simulated
          Annealing a powerful technique for finding approximate solutions to
          complex optimization problems, especially when the objective function
          landscape is rugged or has many local optima. Additionally, it allows
          the algorithm to be applied in a variety of domains, not only in TSP
          but also in other problems like job scheduling, resource allocation,
          and network optimization.
        </p>
      </div>
    </>
  );
}
